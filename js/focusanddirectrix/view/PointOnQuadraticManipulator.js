// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a point on a quadratic. Displays the coordinates of the point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  class PointOnQuadraticManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Property.<Vector2>} pointOnQuadraticProperty - a point on the interactive quadratic
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
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA,
        tandem: Tandem.required
      }, options );

      super( radius, GQColors.POINT_ON_QUADRATIC, options );

      // Coordinates are identical to pointOnQuadraticProperty. We're using a separate Property here
      // for PhET-iO instrumentation symmetry with other manipulators.
      const coordinatesProperty = new DerivedProperty( [ pointOnQuadraticProperty ],
        pointOnQuadratic => pointOnQuadratic, {
          valueType: Vector2,
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioType: DerivedPropertyIO( Vector2IO ),
          phetioInstanceDocumentation: 'coordinates displayed on the point-on-quadratic manipulator'
        } );

      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: GQColors.POINT_ON_QUADRATIC,
        decimals: GQConstants.POINT_ON_QUADRATIC_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // x offset of coordinates from manipulator
      const coordinatesXOffset = 1.8 * radius;

      // position coordinates based on which side of the parabola the point is on
      coordinatesProperty.link( coordinates => {
        const vertex = quadraticProperty.value.vertex;
        if ( !vertex || ( coordinates.x >= vertex.x ) ) {
          coordinatesNode.left = coordinatesXOffset;
        }
        else {
          coordinatesNode.right = -coordinatesXOffset;
        }
        coordinatesNode.centerY = 0;
      } );

      // move the manipulator
      pointOnQuadraticProperty.link( pointOnQuadratic => {
        this.translation = modelViewTransform.modelToViewPosition( pointOnQuadratic );
      } );

      pointOnQuadraticVisibleProperty.link( visible => { this.visible = visible; } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

      // @private
      this.addInputListener( new PointOnQuadraticDragHandler( pointOnQuadraticProperty, quadraticProperty,
        modelViewTransform, xRange, yRange, options.tandem.createTandem( 'dragHandler' ) ) );
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
     * @param {Tandem} tandem
     */
    constructor( pointOnQuadraticProperty, quadraticProperty, modelViewTransform, xRange, yRange, tandem ) {

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
          const x = modelViewTransform.viewToModelPosition( parentPoint ).x;

          // set to the closest point on the parabola that is within the bounds of the graph
          pointOnQuadraticProperty.value = quadraticProperty.value.getClosestPointInRange( x, xRange, yRange );
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator.PointOnQuadraticDragHandler', PointOnQuadraticDragHandler );

  return PointOnQuadraticManipulator;
} );
