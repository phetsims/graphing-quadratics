// Copyright 2018-2021, University of Colorado Boulder

/**
 * A point tool displays the (x,y) coordinates of a point on the graph.
 * If it's sufficiently close to a curve, it will snap to that curve.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import pointToolLeftImage from '../../../images/point_tool_left_png.js';
import pointToolRightImage from '../../../images/point_tool_right_png.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQQueryParameters from '../GQQueryParameters.js';
import CoordinatesNode from './CoordinatesNode.js';

// constants
const VALUE_WINDOW_CENTER_X = 52; // center of the value window, relative to the left edge of pointToolLeftImage

class PointToolNode extends Node {

  /**
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   * @param {BooleanProperty} graphContentsVisibleProperty
   * @param {Object} [options]
   */
  constructor( pointTool, modelViewTransform, graph, graphContentsVisibleProperty, options ) {

    options = merge( {
      cursor: 'pointer',
      backgroundNormalColor: 'white',
      foregroundNormalColor: 'black',
      foregroundHighlightColor: 'white',

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: Tandem.PHET_IO_ENABLED ? pointTool.phetioDocumentation : null,
      phetioInputEnabledPropertyInstrumented: true

    }, options );

    // use the image file that corresponds to the probeSide
    const bodyImage = ( pointTool.probeSide === 'left' ) ? pointToolLeftImage : pointToolRightImage;
    const bodyNode = new Image( bodyImage, { centerY: 0 } );

    const probeNode = new ProbeNode();

    const coordinatesProperty = new DerivedProperty( [ pointTool.positionProperty ],
      position => ( graph.contains( position ) ? position : null ), {
        valueType: [ Vector2, null ]
      } );

    // coordinates display
    const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
      font: new PhetFont( { size: 15, weight: 'bold' } ),
      foregroundColor: 'white',
      backgroundOpacity: 0, // don't use the CoordinatesNode background, because it resizes to the value
      xMargin: 0,
      yMargin: 0,
      decimals: GQConstants.POINT_TOOL_DECIMALS,
      maxWidth: 75 // constrain width, determined empirically, dependent on bodyNode
    } );

    // background behind the coordinates, sized to the body so that it shows through the window
    const backgroundNode = new Rectangle( 0, 0, bodyNode.width - 10, bodyNode.height - 10 );

    // Put probe on correct side of body. Move the body, since the probe establishes the origin.
    if ( pointTool.probeSide === 'left' ) {
      bodyNode.left = probeNode.right - 1; // -1 for overlap, so you don't see a gap
    }
    else {
      probeNode.setScaleMagnitude( -1, 1 ); // reflect about the y axis
      bodyNode.right = probeNode.left + 1; // +1 for overlap, so you don't see a gap
    }
    backgroundNode.center = bodyNode.center;

    options.children = [ backgroundNode, bodyNode, probeNode, coordinatesNode ];
    super( options );

    // center coordinates in window
    coordinatesProperty.link( coordinates => {
      if ( pointTool.probeSide === 'left' ) {
        coordinatesNode.centerX = bodyNode.left + VALUE_WINDOW_CENTER_X;
      }
      else {
        coordinatesNode.centerX = bodyNode.right - VALUE_WINDOW_CENTER_X;
      }
      coordinatesNode.centerY = bodyNode.centerY;
    } );

    Property.multilink( [ pointTool.positionProperty, pointTool.quadraticProperty, graphContentsVisibleProperty ],
      ( position, onQuadratic, graphContentsVisible ) => {

        // move to position
        this.translation = modelViewTransform.modelToViewPosition( position );

        // update colors
        if ( graph.contains( position ) && onQuadratic && graphContentsVisible ) {

          // color code the display to onQuadratic
          coordinatesNode.foreground = options.foregroundHighlightColor;
          backgroundNode.fill = onQuadratic.color;
        }
        else {
          coordinatesNode.foreground = options.foregroundNormalColor;
          backgroundNode.fill = options.backgroundNormalColor;
        }
      } );

    // add the drag listener
    this.addInputListener( new PointToolDragListener( this, pointTool, modelViewTransform, graph,
      graphContentsVisibleProperty, {
        tandem: options.tandem.createTandem( 'dragListener' ),
        phetioDocumentation: 'the drag listener for this point tool'
      } ) );

    // put a red dot at the origin, for debugging positioning
    if ( GQQueryParameters.showOrigin ) {
      this.addChild( new Circle( 3, { fill: 'red' } ) );
    }
  }
}

graphingQuadratics.register( 'PointToolNode', PointToolNode );

class ProbeNode extends Node {

  /**
   * The probe that is attached to the side of the point tool.
   * Drawn for attachment to left side.
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
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

class PointToolDragListener extends DragListener {

  /**
   * Drag handler for the point tool.
   * @param {Node} targetNode - the Node that we attached this listener to
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   * @param {BooleanProperty} graphContentsVisibleProperty
   * @param {Object} [options]
   */
  constructor( targetNode, pointTool, modelViewTransform, graph, graphContentsVisibleProperty, options ) {

    let startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

    options = merge( {

      allowTouchSnag: true,

      // note where the drag started
      start: ( event, listener ) => {

        // Note the mouse-click offset when dragging starts.
        const position = modelViewTransform.modelToViewPosition( pointTool.positionProperty.value );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );

        // Move the tool that we're dragging to the foreground.
        event.currentTarget.moveToFront();
      },

      drag: ( event, listener ) => {

        // Convert drag point to model position
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        let position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrained to dragBounds
        position = pointTool.dragBounds.closestPointTo( position );

        // If we're on the graph and the contents of the graph are visible...
        if ( graph.contains( position ) && graphContentsVisibleProperty.value ) {

          // snap to a quadratic, if we're close enough
          const snapQuadratic = pointTool.getQuadraticNear( position,
            GQQueryParameters.snapOffDistance, GQQueryParameters.snapOnDistance );
          if ( snapQuadratic ) {
            position = snapQuadratic.getClosestPoint( position );
          }
        }

        // move the point tool
        pointTool.positionProperty.value = position;
      }
    }, options );

    super( options );
  }
}

export default PointToolNode;