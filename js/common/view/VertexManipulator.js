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
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
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
     * @param {NumberProperty} hProperty
     * @param {NumberProperty} kProperty
     * @param {GQGraph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, hProperty, kProperty, graph, modelViewTransform,
                 vertexVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA,
        tandem: Tandem.required
      }, options );

      super( radius, GQColors.VERTEX, options );

      // coordinates correspond to the quadratic's vertex (if it has one)
      const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
          isValidValue: value => ( value instanceof Vector2 || value === null ),
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) ),
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

      // position coordinates based on which way the curve opens
      coordinatesProperty.link( coordinates => {
        if ( coordinates ) {
          coordinatesNode.centerX = 0;
          if ( quadraticProperty.value.a > 0 ) {
            coordinatesNode.top = coordinatesYOffset;
          }
          else {
            coordinatesNode.bottom = -coordinatesYOffset;
          }
        }
      } );

      // move the manipulator
      quadraticProperty.link( quadratic => {
        if ( quadratic.vertex ) {
          this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
        }
      } );

      // visibility
      Property.multilink( [ vertexVisibleProperty, quadraticProperty ], ( vertexVisible, quadratic ) => {
        this.visible = !!( vertexVisible && quadratic.vertex && graph.contains( quadratic.vertex ) );
      } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

      // @private
      this.addInputListener( new VertexDragHandler( hProperty, kProperty, modelViewTransform,
        options.tandem.createTandem( 'dragHandler' ) ) );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {NumberProperty} hProperty
     * @param {NumberProperty} kProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( hProperty, kProperty, modelViewTransform, tandem ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewXY( hProperty.value, kProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let location = modelViewTransform.viewToModelPosition( parentPoint );

          //TODO setting h and k separately results in an intermediate Quadratic
          // constrain to range and snap to grid
          hProperty.value = Util.roundSymmetric( hProperty.range.constrainValue( location.x ) );
          kProperty.value = Util.roundSymmetric( kProperty.range.constrainValue( location.y ) );
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
