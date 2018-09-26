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
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} pointOnQuadraticVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, pointOnQuadraticProperty, xRange, yRange, modelViewTransform,
                 pointOnQuadraticVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA
      }, options );

      super( radius, GQColors.POINT_ON_QUADRATIC, options );

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

      pointOnQuadraticVisibleProperty.link( visible => { this.visible = visible; } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

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

          // constrain to graph bounds
          x = xRange.constrainValue( x );
          let y = quadraticProperty.value.solveY( x );
          if ( !yRange.contains( y ) ) {
            // y is off the graph, solve for x
            y = ( y > yRange.max ) ? yRange.max : yRange.min;
            const xValues = quadraticProperty.value.solveX( y );
            x = ( x < quadraticProperty.value.vertex.x ) ? xValues[ 0 ] : xValues[ 1 ];
          }

          // update model
          pointOnQuadraticProperty.value = new Vector2( x, y );
        }
      } );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator.PointOnQuadraticDragHandler', PointOnQuadraticDragHandler );

  return PointOnQuadraticManipulator;
} );
