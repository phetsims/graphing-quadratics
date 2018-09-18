// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a point on a quadratic. Displays the coordinates of the point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  class PointOnQuadraticManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Property.<Vector2>} pointOnQuadraticProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} coordinatesVisibleProperty
     */
    constructor( radius, quadraticProperty, pointOnQuadraticProperty, xRange, yRange, modelViewTransform, coordinatesVisibleProperty ) {

      super( radius, GQColors.POINT_ON_QUADRATIC, {
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA
      } );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( pointOnQuadraticProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.POINT_ON_QUADRATIC ).withAlpha( 0.75 ),
        decimals: GQConstants.POINT_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesXOffset = 1.8 * radius;

      // move the manipulator
      pointOnQuadraticProperty.link( point => {

        this.translation = modelViewTransform.modelToViewPosition( point );

        // position coordinates based on which side of the curve the point is on
        const vertex = quadraticProperty.value.vertex;
        if ( !vertex || ( point.x >= vertex.x ) ) {
          coordinatesNode.left = coordinatesXOffset;
        }
        else {
          coordinatesNode.right = -coordinatesXOffset;
        }
        coordinatesNode.centerY = 0;
      } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );

      // @private
      this.addInputListener( new PointOnQuadraticDragHandler( pointOnQuadraticProperty, quadraticProperty,
        modelViewTransform, xRange, yRange ) );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator', PointOnQuadraticManipulator );

  class PointOnQuadraticDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for point on the quadratic.
     * @param {Property.<Vector2>} pointOnQuadraticProperty
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Range} xRange
     * @param {Range} yRange
     */
    constructor( pointOnQuadraticProperty, quadraticProperty, modelViewTransform, xRange, yRange ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewPosition( pointOnQuadraticProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let x = modelViewTransform.viewToModelPosition( parentPoint ).x;

          //TODO constrain to graph bounds

          // update model
          pointOnQuadraticProperty.value = new Vector2( x, quadraticProperty.value.solveY( x ) );
        }
      } );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator.PointOnQuadraticDragHandler', PointOnQuadraticDragHandler );

  return PointOnQuadraticManipulator;
} );
