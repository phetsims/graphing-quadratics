// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a point on a parabola. Displays the coordinates of the point.
 *
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
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // constants
  const COORDINATES_X_SPACING = 1;

  class PointOnParabolaManipulator extends GQManipulator {

    /**
     * @param {Property.<Vector2>} pointOnParabolaProperty - the point
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} pointOnParabolaVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointOnParabolaProperty, quadraticProperty, graph, modelViewTransform,
                 pointOnParabolaVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // GQManipulator options
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        color: GQColors.POINT_ON_PARABOLA,
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.POINT_ON_PARABOLA,
        coordinatesDecimals: GQConstants.POINT_ON_PARABOLA_DECIMALS,

        // phet-io
        phetioDocumentation: 'a manipulator for a point on the parabola'

      }, options );

      // position coordinates based on which side of the parabola the point is on
      assert && assert( !options.layoutCoordinates, 'PointOnParabolaManipulator sets layoutCoordinates' );
      options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
        assert && assert( coordinates, 'expected coordinates' );
        const vertex = quadraticProperty.value.vertex;
        assert && assert( vertex, 'expected a parabola' );
        const xOffset = radius + COORDINATES_X_SPACING;
        if ( coordinates.x >= vertex.x ) {
          coordinatesNode.left = xOffset;
        }
        else {
          coordinatesNode.right = -xOffset;
        }
        coordinatesNode.centerY = 0;
      };

      // Coordinates are identical to pointOnParabolaProperty. We're using a separate Property here
      // for PhET-iO instrumentation symmetry with other manipulators.
      const coordinatesProperty = new DerivedProperty( [ pointOnParabolaProperty ],
        pointOnParabola => pointOnParabola, {
          valueType: Vector2,
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioDocumentation: 'coordinates displayed on the point-on-quadratic manipulator',
          phetioType: DerivedPropertyIO( Vector2IO )
        } );

      super( coordinatesProperty, coordinatesVisibleProperty, options );

      // add drag handler
      this.addInputListener( new PointOnParabolaDragListener( this, pointOnParabolaProperty, quadraticProperty,
        modelViewTransform, graph, {
          tandem: options.tandem.createTandem( 'dragListener' ),
          phetioDocumentation: 'the drag listener for this point-on-parabola manipulator',
          phetioFeatured: true
        } ) );

      // move the manipulator
      pointOnParabolaProperty.link( pointOnParabola => {
        this.translation = modelViewTransform.modelToViewPosition( pointOnParabola );
      } );

      // visibility of this Node
      pointOnParabolaVisibleProperty.link( visible => {
        this.interruptSubtreeInput(); // cancel any drag that is in progress
        this.visible = visible;
      } );
    }
  }

  graphingQuadratics.register( 'PointOnParabolaManipulator', PointOnParabolaManipulator );

  class PointOnParabolaDragListener extends DragListener {

    /**
     * Drag handler for point on the parabola.
     * @param {Node} targetNode - the Node that we attached this listener to
     * @param {Property.<Vector2>} pointOnParabolaProperty - the point
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Graph} graph
     * @param {Object} [options]
     */
    constructor( targetNode, pointOnParabolaProperty, quadraticProperty, modelViewTransform, graph, options ) {

      let startOffset; // where the drag started, relative to the manipulator

      options = _.extend( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, listener ) => {
          const location = modelViewTransform.modelToViewPosition( pointOnParabolaProperty.value );
          startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, listener ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
          const point = modelViewTransform.viewToModelPosition( parentPoint );

          // get the closest point on the parabola
          const pointOnParabola = quadraticProperty.value.getClosestPoint( point );

          // constrain to the range of the graph. x & y may both be out of range.
          if ( !graph.xRange.contains( pointOnParabola.x ) ) {

            // x is out of range, so constrain x, and solve for y
            pointOnParabola.setX( graph.xRange.constrainValue( pointOnParabola.x ) );
            pointOnParabola.setY( quadraticProperty.value.solveY( pointOnParabola.x ) );
          }

          if ( !graph.yRange.contains( pointOnParabola.y ) ) {

            // y is out of range, so constrain y, solve for x, and choose the closer of the 2 solutions
            pointOnParabola.setY( graph.yRange.constrainValue( pointOnParabola.y ) );
            const xSolutions = quadraticProperty.value.solveX( pointOnParabola.y );
            assert && assert( xSolutions && xSolutions.length === 2, 'expected 2 solutions for x: ' + xSolutions );
            const xClosest = ( Math.abs( xSolutions[ 0 ] - pointOnParabola.x ) < Math.abs( xSolutions[ 1 ] - pointOnParabola.x ) )
                             ? xSolutions[ 0 ] : xSolutions[ 1 ];
            pointOnParabola.setX( xClosest );
          }

          pointOnParabolaProperty.value = pointOnParabola;
        }
      }, options );

      super( options );
    }
  }

  graphingQuadratics.register( 'PointOnParabolaManipulator.PointOnParabolaDragListener', PointOnParabolaDragListener );

  return PointOnParabolaManipulator;
} );
