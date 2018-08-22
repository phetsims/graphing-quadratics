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
        haloAlpha: GQColors.HALO_ALPHA.point 
      } );

      // local Property whose value is the vertex of the current value of quadraticProperty
      const vertexProperty = new Property( quadraticProperty.value.vertex, {
        valueType: Vector2,
        reentrant: true
      } );

      // When the quadratic changes, set vertexProperty to the quadratic's vertex.
      quadraticProperty.link( quadratic => {
        this.visible = !!quadratic.vertex; // visible if the quadratic has a vertex
        if ( quadratic.vertex && !quadratic.vertex.equals( vertexProperty.value ) ) {
          vertexProperty.value = quadratic.vertex;
        }
      } );

      // When the vertex changes, create new quadratic. 
      vertexProperty.link( vertex => {
        const quadratic = quadraticProperty.value;
        if ( vertex.x !== quadratic.vertex.x || vertex.y !== quadratic.vertex.y ) {
          quadraticProperty.value = Quadratic.createFromVertexForm( quadratic.a, vertex.x, vertex.y );
        }
      } );

      // move the manipulator to match the vertex location
      const lineObserver = vertex => { this.translation = modelViewTransform.modelToViewPosition( vertex ); };
      vertexProperty.link( lineObserver ); // unlink in dispose

      this.addInputListener( new VertexDragHandler( vertexProperty, xRange, yRange, modelViewTransform ) );

      // @private called by dispose
      this.disposePointManipulator = () => {
        vertexProperty.unlink( lineObserver );
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
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( vertexProperty, xRange, yRange, modelViewTransform ) {

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
          const location = modelViewTransform.viewToModelPosition( parentPoint );

          // constrain to range, snap to grid
          const x = Util.roundSymmetric( Util.clamp( location.x, xRange.min, xRange.max ) );
          const y = Util.roundSymmetric( Util.clamp( location.y, yRange.min, yRange.max ) );
          vertexProperty.value = new Vector2( x, y );
        }
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
