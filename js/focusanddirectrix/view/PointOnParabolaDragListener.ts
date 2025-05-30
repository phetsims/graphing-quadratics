// Copyright 2025, University of Colorado Boulder

/**
 * PointOnParabolaDragListener is the drag listener for PointOnParabolaManipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ManipulatorDragListener from '../../../../graphing-lines/js/common/view/manipulator/ManipulatorDragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import { DragListenerOptions, PressedDragListener } from '../../../../scenery/js/listeners/DragListener.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

export class PointOnParabolaDragListener extends ManipulatorDragListener {

  /**
   * @param targetNode - the Node that we attached this listener to
   * @param pointOnParabolaProperty - the point
   * @param quadraticProperty - the interactive quadratic
   * @param modelViewTransform
   * @param graph
   * @param [providedOptions]
   */
  public constructor( targetNode: Node,
                      pointOnParabolaProperty: Property<Vector2>,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      providedOptions: DragListenerOptions<PressedDragListener> ) {

    let startOffset: Vector2; // where the drag started, relative to the manipulator

    const options = combineOptions<DragListenerOptions<PressedDragListener>>( {

      // note where the drag started
      start: ( event, listener ) => {
        const position = modelViewTransform.modelToViewPosition( pointOnParabolaProperty.value );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
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
          const xSolutions = quadraticProperty.value.solveX( pointOnParabola.y )!;
          assert && assert( xSolutions && xSolutions.length === 2, `expected 2 solutions for x: ${xSolutions}` );
          const xClosest = ( Math.abs( xSolutions[ 0 ] - pointOnParabola.x ) < Math.abs( xSolutions[ 1 ] - pointOnParabola.x ) )
                           ? xSolutions[ 0 ] : xSolutions[ 1 ];
          pointOnParabola.setX( xClosest );
        }

        // Snap to the x value as it will be displayed, by solving for y.
        // This is so we don't see different y values for the same x value.
        // See https://github.com/phetsims/graphing-quadratics/issues/172.
        const x = toFixedNumber( pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS );
        const y = quadraticProperty.value.solveY( x );

        pointOnParabolaProperty.value = new Vector2( x, y );
      }
    }, providedOptions );

    super( options );
  }
}

graphingQuadratics.register( 'PointOnParabolaDragListener', PointOnParabolaDragListener );