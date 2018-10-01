// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a quadratic by changing its vertex.
 * Displays the coordinates of the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  class VertexManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {GQGraph} graph
     * @param {Range} hRange
     * @param {Range} kRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, graph, hRange, kRange, modelViewTransform,
                 vertexVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA,
        tandem: Tandem.required
      }, options );

      super( radius, GQColors.VERTEX, options );

      const coordinatesProperty = new Property( quadraticProperty.value.vertex, {
        reentrant: true, //TODO #17
        isValidValue: value => ( value instanceof Vector2 || value === null ),
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioType: PropertyIO( NullableIO( Vector2IO ) ),
        phetioInstanceDocumentation: 'coordinates displayed by the vertex manipulator, null means no vertex'
      } );

      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.VERTEX ).withAlpha( 0.75 ),
        decimals: GQConstants.VERTEX_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesYOffset = 1.8 * radius;

      quadraticProperty.link( quadratic => {

        if ( quadratic.vertex === undefined ) {
          coordinatesProperty.value = null;
        }
        else {
          coordinatesProperty.value = quadratic.vertex;

          // position coordinates based on which way the curve opens
          coordinatesNode.centerX = 0;
          if ( quadraticProperty.value.a > 0 ) {
            coordinatesNode.top = coordinatesYOffset;
          }
          else {
            coordinatesNode.bottom = -coordinatesYOffset;
          }
        }
      } );

      // When the vertex changes, move the manipulator and create a new quadratic.
      coordinatesProperty.link( vertex => {
        if ( vertex ) {
          this.translation = modelViewTransform.modelToViewPosition( vertex );
          const quadratic = quadraticProperty.value;
          if ( !quadratic.vertex || !vertex.equals( quadratic.vertex ) ) {
            quadraticProperty.value = Quadratic.createFromVertexForm( quadratic.a, vertex.x, vertex.y );
          }
        }
      } );

      // visibility
      Property.multilink( [ vertexVisibleProperty, coordinatesProperty ], ( vertexVisible, vertex ) => {
        this.visible = !!( vertexVisible && vertex && graph.contains( vertex ) );
      } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

      // @private
      this.addInputListener( new VertexDragHandler( coordinatesProperty, modelViewTransform,
        new Bounds2( hRange.min, kRange.min, hRange.max, kRange.max ),
        options.tandem.createTandem( 'dragHandler') ) );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {Property.<Vector2>} vertexProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Bounds2} bounds
     * @param {Tandem} tandem
     */
    constructor( vertexProperty, modelViewTransform, bounds, tandem ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewPosition( vertexProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let location = modelViewTransform.viewToModelPosition( parentPoint );

          // constrain to graph bounds
          location = bounds.closestPointTo( location );

          // snap to grid
          vertexProperty.value = new Vector2( Util.roundSymmetric( location.x ), Util.roundSymmetric( location.y ) );
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
