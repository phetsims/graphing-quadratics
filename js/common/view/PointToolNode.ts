// Copyright 2018-2025, University of Colorado Boulder

/**
 * PointToolNode is a tool that displays the (x,y) coordinates of a point on the graph.
 * If it is sufficiently close to a curve, it will snap to that curve.
 * If it is not on the graph, it will display '( ?, ? )'.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import PointToolBodyNode from '../../../../graphing-lines/js/common/view/PointToolBodyNode.js';
import Shape from '../../../../kite/js/Shape.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import IndexedNodeIO from '../../../../scenery/js/nodes/IndexedNodeIO.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQQueryParameters from '../GQQueryParameters.js';
import PointTool from '../model/PointTool.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { PointToolDragListener } from './PointToolDragListener.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

const PROBE_RADIUS = 15;
const PROBE_STROKE = 'black';

type SelfOptions = {
  backgroundNormalColor?: TColor;
  foregroundNormalColor?: TColor;
  foregroundHighlightColor?: TColor;
};

type PointToolNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'accessibleName' | 'accessibleHelpText'>;

export default class PointToolNode extends InteractiveHighlighting( Node ) {

  private readonly pointTool: PointTool;
  private readonly graph: Graph;

  public constructor( pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: PointToolNodeOptions ) {

    const options = optionize4<PointToolNodeOptions, SelfOptions, NodeOptions>()(
      {}, AccessibleDraggableOptions, {

        // SelfOptions
        backgroundNormalColor: 'white',
        foregroundNormalColor: 'black',
        foregroundHighlightColor: 'white',

        // NodeOptions
        cursor: 'pointer',
        isDisposable: false,
        tagName: 'div',
        focusable: true,
        phetioDocumentation: Tandem.PHET_IO_ENABLED ? pointTool.phetioDocumentation : '',
        phetioFeatured: true,
        phetioInputEnabledPropertyInstrumented: true,
        visiblePropertyOptions: {
          phetioFeatured: true
        },

        // PointToolNode moves to the front when you press it. So make z-ordering stateful.
        // See https://github.com/phetsims/graphing-quadratics/issues/202
        phetioType: IndexedNodeIO,
        phetioState: true
      }, providedOptions );

    // coordinatesProperty is null when the tool is not on the graph.
    const coordinatesProperty = new DerivedProperty( [ pointTool.positionProperty ],
      position => ( graph.contains( position ) ? position : null ), {
        valueType: [ Vector2, null ]
      } );

    const bodyNode = new PointToolBodyNode( coordinatesProperty, {
      backgroundWidth: 86,
      coordinatesSide: pointTool.probeSide,
      decimals: GQConstants.POINT_TOOL_DECIMALS
    } );

    const probeNode = new ProbeNode();

    // Put probe on correct side of body. Move the body, since the probe establishes the origin.
    if ( pointTool.probeSide === 'left' ) {
      bodyNode.left = probeNode.right - 1; // -1 for overlap, so you don't see a gap
    }
    else {
      probeNode.setScaleMagnitude( -1, 1 ); // reflect about the y-axis
      bodyNode.right = probeNode.left + 1; // +1 for overlap, so you don't see a gap
    }
    bodyNode.centerY = probeNode.centerY;

    options.children = [ bodyNode, probeNode ];

    super( options );

    this.pointTool = pointTool;
    this.graph = graph;

    Multilink.multilink( [ pointTool.positionProperty, pointTool.quadraticProperty, graphContentsVisibleProperty ],
      ( position, onQuadratic, graphContentsVisible ) => {

        // move to position
        this.translation = modelViewTransform.modelToViewPosition( position );

        // update colors
        if ( graph.contains( position ) && onQuadratic && graphContentsVisible ) {

          // color code the display to onQuadratic
          bodyNode.setTextFill( options.foregroundHighlightColor );
          bodyNode.setBackgroundFill( onQuadratic.color );
        }
        else {
          bodyNode.setTextFill( options.foregroundNormalColor );
          bodyNode.setBackgroundFill( options.backgroundNormalColor );
        }
      } );

    // Drag listeners for pointer and keyboard input.
    this.addInputListener( new PointToolDragListener( this, pointTool, modelViewTransform, graph,
      graphContentsVisibleProperty, this.tandem ) );

    // put a red dot at the origin, for debugging positioning
    if ( GQQueryParameters.showOrigin ) {
      this.addChild( new Circle( 3, { fill: 'red' } ) );
    }

    // Requested in https://github.com/phetsims/graphing-quadratics/issues/191
    this.addLinkedElement( pointTool );

    this.focusedProperty.lazyLink( focused => {
      focused && this.doAccessibleObjectResponse();
    } );
  }

  /**
   * Adds an accessible object response that describes the point that the point tool is currently measuring.
   */
  public doAccessibleObjectResponse(): void {
    const position = this.pointTool.positionProperty.value;
    let response: string;
    if ( this.graph.contains( position ) ) {
      response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.pointToolNode.accessibleObjectResponseStringProperty.value, {

        // Use the same formatting and number of decimal places as the visual UI.
        x: toFixedNumber( position.x, GQConstants.POINT_TOOL_DECIMALS ),
        y: toFixedNumber( position.y, GQConstants.POINT_TOOL_DECIMALS )
      } );
    }
    else {
      response = GraphingQuadraticsStrings.a11y.pointToolNode.accessibleObjectResponseNoPointStringProperty.value;
    }
    this.addAccessibleObjectResponse( response );
  }
}

/**
 * The probe that is attached to the side of the point tool. Drawn for attachment to left side.
 */

class ProbeNode extends Node {

  public constructor() {

    // circle
    const circle = new Circle( PROBE_RADIUS, {
      lineWidth: 3,
      stroke: PROBE_STROKE,
      fill: 'rgba( 255, 255, 255, 0.2 )', // transparent white
      centerX: 0,
      centerY: 0
    } );

    // crosshairs
    const crosshairs = new Path( new Shape()
      .moveTo( -PROBE_RADIUS, 0 )
      .lineTo( PROBE_RADIUS, 0 )
      .moveTo( 0, -PROBE_RADIUS )
      .lineTo( 0, PROBE_RADIUS ), {
      stroke: PROBE_STROKE,
      center: circle.center
    } );

    // shaft that connects the probe to the body
    const shaft = new Rectangle( 0, 0, 0.5 * PROBE_RADIUS, 4, {
      fill: 'rgb( 144, 144, 144 )',
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

graphingQuadratics.register( 'PointToolNode', PointToolNode );