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
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

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
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA,
        tandem: Tandem.required
      }, options );

      super( radius, GQColors.POINT_ON_QUADRATIC, options );

      const coordinatesProperty = new Property( pointOnQuadraticProperty.value, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioType: PropertyIO( Vector2IO ),
        phetioInstanceDocumentation: 'coordinates displayed on the point-on-quadratic manipulator'
      } );

      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.POINT_ON_QUADRATIC ).withAlpha( 0.75 ),
        decimals: GQConstants.POINT_ON_QUADRATIC_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesXOffset = 1.8 * radius;

      // move the manipulator
      pointOnQuadraticProperty.link( point => {

        // move to location
        this.translation = modelViewTransform.modelToViewPosition( point );

        // update coordinates
        coordinatesProperty.value = point;

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

          // update model
          pointOnQuadraticProperty.value = quadraticProperty.value.getClosestPointInRange( x, xRange, yRange );
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'PointOnQuadraticManipulator.PointOnQuadraticDragHandler', PointOnQuadraticDragHandler );

  return PointOnQuadraticManipulator;
} );
