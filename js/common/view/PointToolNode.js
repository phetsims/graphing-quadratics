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
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // images
  const pointToolLeftImage = require( 'image!GRAPHING_QUADRATICS/point_tool_left.png' );
  const pointToolRightImage = require( 'image!GRAPHING_QUADRATICS/point_tool_right.png' );

  // constants
  const VALUE_WINDOW_CENTER_X = 44; // center of the value window, relative to the left edge of pointToolLeftImage

  class PointToolNode extends Node {

    /**
     * @param {PointTool} pointTool
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Graph} graph
     * @param {Property.<Boolean>} graphContentsVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointTool, modelViewTransform, graph, graphContentsVisibleProperty, options ) {

      options = _.extend( {
        cursor: 'pointer',
        backgroundNormalColor: 'white',
        foregroundNormalColor: 'black',
        foregroundHighlightColor: 'white',
        tandem: Tandem.required
      }, options );

      // use the image file that corresponds to the probeLocation
      const bodyImage = ( pointTool.probeLocation === 'left' ) ? pointToolLeftImage : pointToolRightImage;
      const bodyNode = new Image( bodyImage, { centerY: 0 } );

      const probeNode = new ProbeNode();

      const coordinatesProperty = new Property( null, {
        isValidValue: value => { return value instanceof Vector2 || value === null; }
      } );

      //TODO #14 instrument coordinatesNode
      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        font: new PhetFont( 15 ),
        foregroundColor: 'white',
        backgroundColor: 'transparent',
        xMargin: 0,
        yMargin: 0,
        decimals: GQConstants.POINT_TOOL_DECIMALS,
        maxWidth: 60 // constrain width, determined empirically, dependent on bodyNode
      } );

      // background behind the coordinates, sized to the body
      const backgroundNode = new Rectangle( 0, 0, bodyNode.width - 10, bodyNode.height - 10 );

      // put probe on correct side of body
      if ( pointTool.probeLocation === 'left' ) {
        bodyNode.left = probeNode.right;
      }
      else {
        probeNode.setScaleMagnitude( -1, 1 ); // reflect about the y axis
        bodyNode.right = probeNode.left;
      }
      backgroundNode.center = bodyNode.center;

      options.children = [ backgroundNode, bodyNode, probeNode, coordinatesNode ];
      super( options );

      Property.multilink( [ pointTool.locationProperty, pointTool.onQuadraticProperty, graphContentsVisibleProperty ],
        ( location, onQuadratic, graphContentsVisible ) => {

          // move to location
          this.translation = modelViewTransform.modelToViewPosition( location );

          // is the point tool on the graph?
          const onGraph = graph.contains( location );

          // update coordinates - (x, y) or (?, ?)
          if ( onQuadratic ) {
            coordinatesProperty.value = location;
          }
          else {
            coordinatesProperty.value = null;
          }

          // center coordinates in window
          if ( pointTool.probeLocation === 'left' ) {
            coordinatesNode.centerX = bodyNode.left + VALUE_WINDOW_CENTER_X;
          }
          else {
            coordinatesNode.centerX = bodyNode.right - VALUE_WINDOW_CENTER_X;
          }
          coordinatesNode.centerY = bodyNode.centerY;

          // updater colors
          if ( onGraph && onQuadratic && graphContentsVisible ) {
            coordinatesNode.foreground = options.foregroundHighlightColor;
            backgroundNode.fill = onQuadratic.color;
          }
          else {
            coordinatesNode.foreground = options.foregroundNormalColor;
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
     * Draw the probe for attachment to left side of the tool.
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
      const shaft = new Rectangle( 0, 0, 0.5 * options.radius, 4, {
        fill: 'rgb( 144, 144, 144 )', // matched to bodyImage
        left: circle.right,
        centerY: circle.centerY
      } );

      super( {
        children: [ shaft, crosshairs, circle ],

        // origin at the center
        x: 0,
        y: 0
      } );
    }
  }

  graphingQuadratics.register( 'PointToolNode.ProbeNode', ProbeNode );

  //TODO #14 instrument PointToolDragHandler
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
              const nearestPoint = quadratic.getClosestPoint( location );
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