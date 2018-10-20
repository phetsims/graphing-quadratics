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
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

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
        tandem: Tandem.required,
        phetioDocumentation: 'a manipulator for a point on the parabola'
      }, options );

      // position coordinates based on which side of the parabola the point is on
      assert && assert( !options.layoutCoordinates, 'PointOnParabolaManipulator sets layoutCoordinates' );
      options.layoutCoordinates = ( coordinates, coordinatesNode ) => {
        const coordinatesXOffset = 1.8 * options.radius;
        const vertex = quadraticProperty.value.vertex;
        if ( !vertex || ( coordinates.x >= vertex.x ) ) {
          coordinatesNode.left = coordinatesXOffset;
        }
        else {
          coordinatesNode.right = -coordinatesXOffset;
        }
        coordinatesNode.centerY = 0;
      };

      // Coordinates are identical to pointOnParabolaProperty. We're using a separate Property here
      // for PhET-iO instrumentation symmetry with other manipulators.
      const coordinatesProperty = new DerivedProperty( [ pointOnParabolaProperty ],
        pointOnParabola => pointOnParabola, {
          valueType: Vector2,
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioType: DerivedPropertyIO( Vector2IO ),
          phetioDocumentation: 'coordinates displayed on the point-on-quadratic manipulator'
        } );

      super( coordinatesProperty, coordinatesVisibleProperty, options );

      // add drag handler
      this.addInputListener( new PointOnParabolaDragListener( this, pointOnParabolaProperty, quadraticProperty,
        modelViewTransform, graph, {
          tandem: options.tandem.createTandem( 'dragListener' ),
          phetioDocumentation: 'the drag listener for this point-on-parabola manipulator'
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
          const x = modelViewTransform.viewToModelPosition( parentPoint ).x;

          // set to the closest point on the parabola that is within the bounds of the graph
          pointOnParabolaProperty.value = quadraticProperty.value.getClosestPointInRange( x, graph.xRange, graph.yRange );
        }
      }, options );

      super( options );
    }
  }

  graphingQuadratics.register( 'PointOnParabolaManipulator.PointOnParabolaDragListener', PointOnParabolaDragListener );

  return PointOnParabolaManipulator;
} );
