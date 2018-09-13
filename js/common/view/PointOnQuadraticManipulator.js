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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  class PointOnQuadraticManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} coordinatesVisibleProperty
     */
    constructor( radius, quadraticProperty, xRange, yRange, modelViewTransform, coordinatesVisibleProperty ) {

      super( radius, GQColors.POINT_ON_QUADRATIC, {
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA
      } );

      const xDefault = 1; //TODO is this correct?
      const pointProperty = new Property( new Vector2( xDefault, quadraticProperty.value.solveY( xDefault ) ) );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( pointProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.POINT_ON_QUADRATIC ).withAlpha( 0.75 ),
        decimals: 0,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesYOffset = 1.8 * radius;

      // unlink not needed
      const quadraticListener = quadratic => {

        // update the point
        const x = pointProperty.value.x;
        pointProperty.value = new Vector2( x, quadratic.solveY( x ) );

        // position coordinates based on which way the curve opens
        coordinatesNode.centerX = 0;
        if ( quadratic.a > 0 ) {
          coordinatesNode.top = coordinatesYOffset;
        }
        else {
          coordinatesNode.bottom = -coordinatesYOffset;
        }
      };
      quadraticProperty.link( quadraticListener );

      // move the manipulator
      pointProperty.link( point => { this.translation = modelViewTransform.modelToViewPosition( point ); } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );

      // @private
      this.addInputListener( new PointOnQuadraticDragHandler( pointProperty, quadraticProperty,
        modelViewTransform, xRange, yRange ) );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator', PointOnQuadraticManipulator );

  class PointOnQuadraticDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for point on the quadratic.
     * @param {Property.<Vector2>} pointProperty
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Range} xRange
     * @param {Range} yRange
     */
    constructor( pointProperty, quadraticProperty, modelViewTransform, xRange, yRange ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewPosition( pointProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let x = modelViewTransform.viewToModelPosition( parentPoint ).x;

          //TODO constrain to graph bounds

          // update model
          pointProperty.value = new Vector2( x, quadraticProperty.value.solveY( x ) );
        }
      } );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator.PointOnQuadraticDragHandler', PointOnQuadraticDragHandler );

  return PointOnQuadraticManipulator;
} );
