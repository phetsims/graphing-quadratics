// Copyright 2018, University of Colorado Boulder

//TODO Copied from GRAPHING_LINES/common/view/PointToolNode
/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Image = require( 'SCENERY/nodes/Image' );
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
  const pointUnknownString = require( 'string!GRAPHING_LINES/point.unknown' );
  const pointXYString = require( 'string!GRAPHING_LINES/point.XY' );

  // images
  const bodyImage = require( 'image!GRAPHING_LINES/point_tool_body.png' );

  // constants
  const NUMBER_OF_DECIMAL_PLACES = 1;
  const VALUE_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of point_tool_body.png
  const CIRCLE_AROUND_CROSSHAIR_RADIUS = 15; // view units, will not be transformed
  const TRANSPARENT_WHITE = 'rgba( 255, 255, 255, 0.2 )';

  class PointToolNode extends Node {

    /**
     * @param {PointTool} pointTool
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Graph} graph
     * @param {Property.<Boolean>} linesVisibleProperty
     * @param {ObservableArray.<Line>} lines Lines that the tool might intersect, provided in the order that they would
     * be rendered
     * @param {Object} [options]
     */
    constructor( pointTool, modelViewTransform, graph, linesVisibleProperty, lines, options ) {

      options = _.extend( {
        cursor: 'pointer',
        backgroundNormalColor: 'white',
        foregroundNormalColor: 'black',
        foregroundHighlightColor: 'white'
      }, options );

      const bodyNode = new Image( bodyImage, { centerY: 0 } ); // body of the tool

      // crosshair view
      const crosshairShape = new Shape()
        .moveTo( -CIRCLE_AROUND_CROSSHAIR_RADIUS, 0 )
        .lineTo( CIRCLE_AROUND_CROSSHAIR_RADIUS * 1.5, 0 )
        .moveTo( 0, -CIRCLE_AROUND_CROSSHAIR_RADIUS )
        .lineTo( 0, CIRCLE_AROUND_CROSSHAIR_RADIUS );

      const crosshair = new Path( crosshairShape, { stroke: 'black' } );
      const circle = new Circle( CIRCLE_AROUND_CROSSHAIR_RADIUS, {
        lineWidth: 2,
        stroke: 'black',
        fill: TRANSPARENT_WHITE,
        centerX: 0,
        centerY: 0
      } );

      /*
       * Tip, separate from the body and not pickable.
       * Because picking bounds are rectangular, making the tip pickable made it difficult
       * to pick a line manipulator when the tip and manipulator were on the same grid point.
       * Making the tip non-pickable was determined to be an acceptable and 'natural feeling' solution.
       */
      const tipNode = new Node( {
        children: [
          crosshair,
          circle
        ],
        pickable: false,
        x: 0,
        y: 0
      } );

      // background behind the displayed value, shows through a transparent hole in the display area portion of the body
      // image
      const BACKGROUND_MARGIN = 5;
      const backgroundNode = new Rectangle( 0, 0,
        bodyNode.width - ( 2 * BACKGROUND_MARGIN ), bodyNode.height - ( 2 * BACKGROUND_MARGIN ),
        { pickable: false } );

      // displayed value
      const valueNode = new Text( '?', {
        font: new PhetFont( { size: 15, weight: 'bold' } ),
        pickable: false,
        maxWidth: 60 // constrain width, determined empirically, dependent on bodyImage
      } );

      // orientation
      if ( pointTool.orientation === 'left' ) {
        bodyNode.left = tipNode.right;
        backgroundNode.centerX = bodyNode.centerX;
        backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
        valueNode.centerY = backgroundNode.centerY;
      }
      else if ( pointTool.orientation === 'right' ) {
        tipNode.setScaleMagnitude( -1, 1 ); // reflect around y-axis
        bodyNode.right = tipNode.left;
        backgroundNode.centerX = bodyNode.centerX;
        backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
        valueNode.centerY = backgroundNode.centerY;
      }
      else {
        throw new Error( 'unsupported point tool orientation: ' + pointTool.orientation );
      }

      options.children = [
        backgroundNode,
        bodyNode,
        tipNode,
        valueNode
      ];
      super( options );

      // @private
      this.backgroundNode = backgroundNode;
      this.bodyNode = bodyNode;
      this.tipNode = tipNode;
      this.valueNode = valueNode;

      // initial state
      this.setCoordinatesVector2( pointTool.locationProperty.value );
      this.setBackground( options.backgroundNormalColor );

      // location and display, unmultilink in dispose
      const updateMultilink = Property.multilink( [
          pointTool.locationProperty,
          pointTool.onLineProperty,
          linesVisibleProperty
        ],
        () => {

          // move to location
          let location = pointTool.locationProperty.value;
          this.translation = modelViewTransform.modelToViewPosition( location );

          // display value and highlighting
          if ( graph.contains( location ) ) {
            this.setCoordinatesVector2( location );
            if ( linesVisibleProperty.value ) {
              // use the line's color to highlight
              this.setForeground( !pointTool.onLineProperty.value ?
                                  options.foregroundNormalColor : options.foregroundHighlightColor );
              this.setBackground( !pointTool.onLineProperty.value ?
                                  options.backgroundNormalColor : pointTool.onLineProperty.value.color );
            }
            else {
              this.setForeground( options.foregroundNormalColor );
              this.setBackground( options.backgroundNormalColor );
            }
          }
          else {
            this.setCoordinatesString( pointUnknownString );
            this.setForeground( options.foregroundNormalColor );
            this.setBackground( options.backgroundNormalColor );
          }
        } );

      // interactivity
      this.addInputListener( new PointToolDragHandler( pointTool, modelViewTransform, graph, lines ) );

      // @private called by dispose
      this.disposePointToolNode = function() {
        Property.unmultilink( updateMultilink );
      };
    }

    /**
     * @public
     * @override
     */
    dispose() {
      this.disposePointToolNode();
      Node.prototype.dispose.call( this );
    }

    // @private Sets the displayed value to a point
    setCoordinatesVector2( p ) {
      this.setCoordinatesString( StringUtils.format(
        pointXYString,
        Util.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ),
        Util.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES )
      ) );
    }

    // @private Sets the displayed value to an arbitrary string
    setCoordinatesString( s ) {
      this.valueNode.text = s;
      this.valueNode.centerX = this.bodyNode.left + VALUE_WINDOW_CENTER_X;  // centered
    }

    // @private Sets the foreground, the color of the displayed value
    setForeground( color ) {
      this.valueNode.fill = color;
    }

    // @private Sets the background, the color of the display area behind the value
    setBackground( color ) {
      this.backgroundNode.fill = color;
    }
  }

  graphingQuadratics.register( 'PointToolNode', PointToolNode );

  class PointToolDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for the pointer tool.
     * @param {PointTool} pointTool
     * @param {ModelViewTransform2} modelViewTransform
     * @param {ObservableArray.<Line>} lines Lines that the tool might intersect, provided in the order that they would
     * be rendered
     * @param {Graph} graph
     */
    constructor( pointTool, modelViewTransform, graph, lines ) {

      let startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

      const constrainBounds = function( point, bounds ) {
        if ( !bounds || bounds.containsPoint( point ) ) {
          return point;
        }
        else {
          return new Vector2(
            Util.clamp( point.x, bounds.minX, bounds.maxX ),
            Util.clamp( point.y, bounds.minY, bounds.maxY )
          );
        }
      };

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: function( event ) {
          // Note the mouse-click offset when dragging starts.
          let location = modelViewTransform.modelToViewPosition( pointTool.locationProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
          // Move the tool that we're dragging to the foreground.
          event.currentTarget.moveToFront();
        },

        drag: function( event ) {
          let parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let location = modelViewTransform.viewToModelPosition( parentPoint );
          location = constrainBounds( location, pointTool.dragBounds );
          if ( graph.contains( location ) ) {
            let line;
            let nearestPoint;
            let distance = 1; // empirically chosen
            for ( let i = 0; i < lines.length; i ++ ) {

              // snap to line if near
              line = lines.get( i );
              nearestPoint = line.nearestPointOnLineToPoint( location );
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