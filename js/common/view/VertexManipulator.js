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
  const BooleanProperty = require( 'AXON/BooleanProperty' );
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
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {NumberProperty} hProperty - h coefficient of the vertex form of the quadratic equation
     * @param {NumberProperty} kProperty - k coefficient of the vertex form of the quadratic equation
     * @param {Graph} graph
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
          phetioDocumentation: 'coordinates displayed by on vertex manipulator, null means no vertex'
        } );

      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: GQColors.VERTEX,
        decimals: GQConstants.VERTEX_DECIMALS,
        pickable: false,
        maxWidth: GQConstants.COORDINATES_MAX_WIDTH
      } );
      this.addChild( coordinatesNode );

      // add drag handler
      const dragHandler = new VertexDragHandler( hProperty, kProperty, graph, modelViewTransform,
        options.tandem.createTandem( 'dragHandler' ) );
      this.addInputListener( dragHandler );

      // move the manipulator
      quadraticProperty.link( quadratic => {
        if ( quadratic.vertex ) {
          this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
        }
      } );

      // position coordinates based on which way the parabola opens
      const coordinatesYOffset = 1.8 * radius;
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

      // visibility of this Node
      const visibleProperty = new BooleanProperty( this.visible );
      visibleProperty.link( visible => {
        dragHandler.endDrag( null ); // cancel any drag that is in progress
        this.visible = visible;
      } );
      Property.multilink( [ vertexVisibleProperty, quadraticProperty ], ( vertexVisible, quadratic ) => {
        visibleProperty.value = !!( vertexVisible && quadratic.vertex && graph.contains( quadratic.vertex ) );
      } );

      // visibility of coordinates
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {NumberProperty} hProperty - h coefficient of vertex form
     * @param {NumberProperty} kProperty - k coefficient of vertex form
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( hProperty, kProperty, graph, modelViewTransform, tandem ) {

      let startOffset; // where the drag started, relative to the manipulator

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

          // constrain to the graph
          location = graph.constrain( location );

          // constrain to range and snap to integer grid
          const h = Util.roundSymmetric( hProperty.range.constrainValue( location.x ) );
          const k = Util.roundSymmetric( kProperty.range.constrainValue( location.y ) );

          // Setting h and k separately results in an intermediate Quadratic.
          // We decided that this is OK, and we can live with it.
          hProperty.value = h;
          kProperty.value = k;
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
