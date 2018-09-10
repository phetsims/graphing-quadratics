// Copyright 2018, University of Colorado Boulder

/**
 * Drag handler for the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  class VertexManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( radius, quadraticProperty, xRange, yRange, modelViewTransform ) {

      super( radius, GQColors.VERTEX, {
        haloAlpha: GQColors.VERTEX_MANIPULATOR_HALO_ALPHA
      } );

      // local Property whose value is the vertex of the current value of quadraticProperty
      const vertexProperty = new Property( quadraticProperty.value.vertex, {
        valueType: Vector2,
        reentrant: true
      } );

      // unlink in dispose.
      const quadraticListener = quadratic => {
        this.visible = !!quadratic.vertex; // visible if the quadratic has a vertex
        if ( quadratic.vertex && !quadratic.vertex.equals( vertexProperty.value ) ) {
          vertexProperty.value = quadratic.vertex;
        }
      };
      quadraticProperty.link( quadraticListener );

      // When the vertex changes, create new quadratic. 
      vertexProperty.link( vertex => {
        const quadratic = quadraticProperty.value;
        if ( vertex.x !== quadratic.vertex.x || vertex.y !== quadratic.vertex.y ) {
          quadraticProperty.value = Quadratic.createFromVertexForm( quadratic.a, vertex.x, vertex.y );
        }
      } );

      // update the manipulator to match the vertex location
      vertexProperty.link( vertex => {
        this.translation = modelViewTransform.modelToViewPosition( vertex );
      } );

      // @private
      this.addInputListener( new VertexDragHandler( vertexProperty, modelViewTransform,
        new Bounds2( xRange.min, yRange.min, xRange.max, yRange.max ) ) );

      // @private called by dispose
      this.disposePointManipulator = () => {
        quadraticProperty.unlink( quadraticListener );
      };
    }

    /**
     * @public
     * @override
     */
    dispose() {
      this.disposePointManipulator();
      Manipulator.prototype.dispose.call( this );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {Property.<Vector2>} vertexProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Bounds2} bounds
     */
    constructor( vertexProperty, modelViewTransform, bounds ) {

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
        }
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
