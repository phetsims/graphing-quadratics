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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQManipulator = require( 'GRAPHING_QUADRATICS/common/view/GQManipulator' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // constants
  const COORDINATES_Y_SPACING = 1;

  class VertexManipulator extends GQManipulator {

    /**
     * @param {NumberProperty} hProperty - h coefficient of the vertex form of the quadratic equation
     * @param {NumberProperty} kProperty - k coefficient of the vertex form of the quadratic equation
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( hProperty, kProperty, quadraticProperty, graph, modelViewTransform,
                 vertexVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // GQManipulator options
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        color: GQColors.VERTEX,
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.VERTEX,
        coordinatesDecimals: GQConstants.VERTEX_DECIMALS,

        // phet-io
        phetioDocumentation: 'a manipulator for the vertex'

      }, options );

      // position coordinates based on which way the parabola opens
      assert && assert( !options.layoutCoordinates, 'VertexManipulator sets layoutCoordinates' );
      options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
        if ( coordinates ) {
          coordinatesNode.centerX = 0;
          const yOffset = radius + COORDINATES_Y_SPACING;
          if ( quadraticProperty.value.a > 0 ) {
            coordinatesNode.top = yOffset;
          }
          else {
            coordinatesNode.bottom = -yOffset;
          }
        }
      };

      // coordinates correspond to the quadratic's vertex (if it has one)
      const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
          isValidValue: value => ( value instanceof Vector2 || value === null ),
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioDocumentation: 'coordinates displayed by on vertex manipulator, null means no vertex',
          phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) )
        } );

      super( coordinatesProperty, coordinatesVisibleProperty, options );

      // add the drag listener
      this.addInputListener( new VertexDragListener( this, hProperty, kProperty, graph, modelViewTransform, {
        tandem: options.tandem.createTandem( 'dragListener' ),
        phetioDocumentation: 'the drag listener for this vertex manipulator',
        phetioFeatured: true
      } ) );

      // move the manipulator
      quadraticProperty.link( quadratic => {
        if ( quadratic.vertex ) {
          this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
        }
      } );

      // visibility of this Node
      const visibleProperty = new DerivedProperty(
        [ vertexVisibleProperty, quadraticProperty ],
        ( vertexVisible, quadratic ) =>
          vertexVisible &&  // the Vertex checkbox is checked
          quadratic.isaParabola() &&  // the quadratic is a parabola, so has a vertex
          graph.contains( quadratic.vertex ) // the vertex is on the graph
      );
      visibleProperty.link( visible => {
        this.interruptSubtreeInput(); // cancel any drag that is in progress
        this.visible = visible;
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragListener extends DragListener {

    /**
     * Drag handler for vertex.
     * @param {Node} targetNode - the Node that we attached this listener to
     * @param {NumberProperty} hProperty - h coefficient of vertex form
     * @param {NumberProperty} kProperty - k coefficient of vertex form
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Object} [options]
     */
    constructor( targetNode, hProperty, kProperty, graph, modelViewTransform, options ) {

      let startOffset; // where the drag started, relative to the manipulator

      options = _.extend( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, listener ) => {
          const location = modelViewTransform.modelToViewXY( hProperty.value, kProperty.value );
          startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, listener ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
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
        }
      }, options );

      super( options );
    }
  }

  return VertexManipulator;
} );
