// Copyright 2018, University of Colorado Boulder

//TODO Copied from GRAPHING_LINES/common/view/manipulator/PointManipulator
/**
 * Drag handler for the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
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
     * @param {number} radius
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( radius, quadraticProperty, xRange, yRange, modelViewTransform ) {

      super(
        modelViewTransform.modelToViewDeltaX( radius ),
        GQColors.VERTEX,
        { haloAlpha: GQColors.HALO_ALPHA.point }
      );

      const vertexProperty = new Property( new Vector2() );

      quadraticProperty.link( quadratic => {
        if ( quadratic.vertex ) {
          this.visible = true;
          if ( !quadratic.vertex.equals( vertexProperty.value ) ) {
            vertexProperty.value = quadratic.vertex;
          }
        }
        else { // quadratic does not have a vertex
          this.visible = false;
        }
      } );

      vertexProperty.link( function( vertex ) {
        const quadratic = quadraticProperty.value;
        if ( vertex.x !== quadratic.vertex.x || vertex.y !== quadratic.vertex.y ) {
          quadraticProperty.value = Quadratic.createFromVertexForm( quadratic.a, vertex.x, vertex.y );
        }
      } );

      // move the manipulator to match the point
      const lineObserver = point => { this.translation = modelViewTransform.modelToViewPosition( point ); };
      vertexProperty.link( lineObserver ); // unlink in dispose

      this.addInputListener( new PointDragHandler( vertexProperty, xRange, yRange, modelViewTransform ) );

      // @private called by dispose
      this.disposePointManipulator = function() {
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

  class PointDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for arbitrary point.
     * @param {Property.<Vector2>} pointProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( pointProperty, xRange, yRange, modelViewTransform ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: function( event ) {
          const location = modelViewTransform.modelToViewPosition( pointProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: function( event ) {

          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          const location = modelViewTransform.viewToModelPosition( parentPoint );

          // constrain to range, snap to grid
          const x = Util.roundSymmetric( Util.clamp( location.x, xRange.min, xRange.max ) );
          const y = Util.roundSymmetric( Util.clamp( location.y, yRange.min, yRange.max ) );
          const p = new Vector2( x, y );

          pointProperty.value = p;
        }
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.PointDragHandler', PointDragHandler );

  return VertexManipulator;
} );
