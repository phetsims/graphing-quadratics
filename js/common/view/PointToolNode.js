// Copyright 2018, University of Colorado Boulder

/**
 * Tool that displays the (x,y) coordinates of a point on the graph.
 * If it's sufficiently close to a quadratic, it will snap to the quadratic.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const coordinateUnknownString = require( 'string!GRAPHING_QUADRATICS/coordinateUnknown' );
  const pointXYString = require( 'string!GRAPHING_QUADRATICS/pointXY' );

  // images
  const bodyImage = require( 'image!GRAPHING_QUADRATICS/point_tool_body.png' );

  // constants
  const VALUE_WINDOW_CENTER_X = 44; // center of the value window, relative to the left edge of bodyImage

  class PointToolNode extends Node {

    /**
     * @param {PointTool} pointTool
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Graph} graph
     * @param {Property.<Boolean>} curvesVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointTool, modelViewTransform, graph, curvesVisibleProperty, options ) {

      options = _.extend( {
        cursor: 'pointer',
        backgroundNormalColor: 'white',
        foregroundNormalColor: 'black',
        foregroundHighlightColor: 'white'
      }, options );

      const bodyNode = new Image( bodyImage, { centerY: 0 } );

      const probeNode = new ProbeNode();

      // displayed coordinates
      const coordinatesNode = new Text( '?', {
        font: new PhetFont( 15 ),
        pickable: false,
        maxWidth: 60 // constrain width, determined empirically, dependent on bodyImage
      } );

      // background behind the coordinates, sized to the body
      const backgroundNode = new Rectangle( 0, 0, bodyNode.width - 10, bodyNode.height - 10, {
        pickable: false
      } );

      // orientation - bodyImage is drawn in 'left' orientation
      assert && assert( pointTool.orientation === 'left' || pointTool.orientation === 'right',
        'unsupported pointTool.orientation: ' + pointTool.orientation );
      if ( pointTool.orientation === 'left' ) {
        bodyNode.left = probeNode.right;
      }
      else {
        bodyNode.setScaleMagnitude( -1, 1 ); // reflect around y-axis
        probeNode.setScaleMagnitude( -1, 1 );
        bodyNode.right = probeNode.left;
      }
      backgroundNode.center = bodyNode.center;

      options.children = [ backgroundNode, bodyNode, probeNode, coordinatesNode ];
      super( options );

      // dispose not needed
      Property.multilink( [ pointTool.locationProperty, pointTool.onQuadraticProperty, curvesVisibleProperty ],
        ( location, onQuadratic, curvesVisible ) => {

          // move to location
          this.translation = modelViewTransform.modelToViewPosition( location );

          // update coordinates - (x, y) or (?, ?)
          const onGraph = graph.contains( location );
          coordinatesNode.text = StringUtils.fillIn( pointXYString, {
            x: onGraph ? Util.toFixedNumber( location.x, GQConstants.POINT_TOOL_DECIMALS ) : coordinateUnknownString,
            y: onGraph ? Util.toFixedNumber( location.y, GQConstants.POINT_TOOL_DECIMALS ) : coordinateUnknownString
          } );

          // center coordinates in window
          if ( pointTool.orientation === 'left' ) {
            coordinatesNode.centerX = bodyNode.left + VALUE_WINDOW_CENTER_X;
          }
          else {
            coordinatesNode.centerX = bodyNode.right - VALUE_WINDOW_CENTER_X;
          }
          coordinatesNode.centerY = bodyNode.centerY;

          // updater colors
          if ( onQuadratic && curvesVisible ) {
            coordinatesNode.fill = options.foregroundHighlightColor;
            backgroundNode.fill = onQuadratic.color;
          }
          else {
            coordinatesNode.fill = options.foregroundNormalColor;
            backgroundNode.fill = options.backgroundNormalColor;
          }
        } );

      // interactivity
      this.addInputListener( new PointToolDragHandler( pointTool, modelViewTransform, graph ) );
    }
  }

  graphingQuadratics.register( 'PointToolNode', PointToolNode );


  class ProbeNode extends Node {

    /**
     * Draw in the 'left' orientation, with the probe on the left side of the tool.
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        radius: 15,
        color: 'black'
      }, options );

      // circle
      const circle = new Circle( options.radius, {
        lineWidth: 3,
        stroke: options.color,
        fill: 'rgba( 255, 255, 255, 0.2 )', // transparent white
        centerX: 0,
        centerY: 0
      } );

      // crosshairs
      const crosshairs = new Path( new Shape()
        .moveTo( -options.radius, 0 )
        .lineTo( options.radius, 0 )
        .moveTo( 0, -options.radius )
        .lineTo( 0, options.radius ), {
        stroke: options.color,
        center: circle.center
      } );

      // shaft that connects the probe to the body
      const shaft = new Line( 0, 0, 0.5 * options.radius, 0, {
        stroke: 'rgb( 144, 144, 144 )', // matched to bodyImage
        lineWidth: 4,
        left: circle.right,
        centerY: circle.centerY
      } );

      super( {
        children: [ shaft, crosshairs, circle ],

        // Not pickable because picking bounds are rectangular, making the tip pickable made it difficult
        // to pick a manipulator when the tip and manipulator were on the same grid point.
        // Making the tip non-pickable was determined to be an acceptable and 'natural feeling' solution.
        pickable: false,

        // origin at the center
        x: 0,
        y: 0
      } );
    }
  }

  graphingQuadratics.register( 'PointToolNode.ProbeNode', ProbeNode );

  class PointToolDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for the point tool.
     * @param {PointTool} pointTool
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Graph} graph
     */
    constructor( pointTool, modelViewTransform, graph ) {

      let startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          // Note the mouse-click offset when dragging starts.
          let location = modelViewTransform.modelToViewPosition( pointTool.locationProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
          // Move the tool that we're dragging to the foreground.
          event.currentTarget.moveToFront();
        },

        drag: ( event, trail ) => {
          let parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let location = modelViewTransform.viewToModelPosition( parentPoint );
          location = pointTool.dragBounds.closestPointTo( location );
          if ( graph.contains( location ) ) {

            //TODO what's up here?
            let distance = 1; // empirically chosen
            for ( let i = 0; i < pointTool.quadratics.length; i++ ) {

              // snap to quadratic if near
              const quadratic = pointTool.quadratics.get( i );
              const nearestPoint = quadratic.nearestPointOnLineToPoint( location );
              if ( nearestPoint.distance( location ) < distance ) {
                distance = nearestPoint.distance( location );
                location = nearestPoint;
              }
            }
            if ( distance === 1 ) { // didn't find a quadratic nearby
              // snap to the graph's grid
              location = new Vector2( Util.toFixedNumber( location.x, 0 ), Util.toFixedNumber( location.y, 0 ) );
            }
          }

          pointTool.locationProperty.value = location;
        }
      } );
    }
  }

  graphingQuadratics.register( 'PointToolNode.PointToolDragHandler', PointToolDragHandler );

  return PointToolNode;
} );