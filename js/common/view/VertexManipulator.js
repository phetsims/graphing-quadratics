// Copyright 2018, University of Colorado Boulder

/**
 * Drag handler for the vertex. Copied from GRAPHING_LINES/common/view/manipulator/PointManipulator
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );

  /**
   * @param {number} radius
   * @param {Property.<Quadratic>} quadraticProperty
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function VertexManipulator( radius, quadraticProperty, xRange, yRange, modelViewTransform ) {

    Manipulator.call(
      this,
      modelViewTransform.modelToViewDeltaX( radius ),
      GQColors.VERTEX,
      { haloAlpha: GQColors.HALO_ALPHA.point }
    );

    const vertexProperty = new Property( new Vector2() );

    quadraticProperty.link( quadratic => {
      if ( quadratic.vertex) {
        this.visible = true;
        if ( !quadratic.vertex.equals( vertexProperty.get() ) ) { // Vector2 equality is not recognized by Property
          vertexProperty.set( quadratic.vertex );
        }
      }
      else { // quadratic does not have a vertex
        this.visible = false;
      }
    } );

    vertexProperty.link( function( vertex ) {
      const a = quadraticProperty.get().a;
      quadraticProperty.set( Quadratic.createFromVertexForm( a, vertex.x, vertex.y ) );
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

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  inherit( Manipulator, VertexManipulator, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposePointManipulator();
      Manipulator.prototype.dispose.call( this );
    }
  } );

  /**
   * Drag handler for arbitrary point.
   * @param {Property.<Vector2>} pointProperty
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function PointDragHandler( pointProperty, xRange, yRange, modelViewTransform ) {

    let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        const location = modelViewTransform.modelToViewPosition( pointProperty.get() );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {

        const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const location = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        const x = Util.roundSymmetric( Util.clamp( location.x, xRange.min, xRange.max ) );
        const y = Util.roundSymmetric( Util.clamp( location.y, yRange.min, yRange.max ) );
        const p = new Vector2( x, y );

        pointProperty.set( p );
      }
    } );
  }

  graphingQuadratics.register( 'VertexManipulator.PointDragHandler', PointDragHandler );

  inherit( SimpleDragHandler, PointDragHandler );

  return VertexManipulator;
} );
