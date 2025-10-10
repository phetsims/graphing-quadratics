// Copyright 2025, University of Colorado Boulder

/**
 * PointToolKeyboardDragListener handles keyboard input for a point tool.
 *
 * The point tool is moved by advancing its x or y position in discrete steps, depending on which arrow key is pressed,
 * and whether the Shift key is pressed. This allows the user to precisely position the tool at a specific point.
 *
 * When the tool is sufficiently close to a curve, it snaps to that curve, and will then move along that curve.
 * The speed that it moves along the curve is determined by the shape of the curve.
 * Snapping off the curve requires using a keyboard shortcut - see MoveOffGraphListener and JumpToNextCurveListener.
 *
 * Note that there was an earlier version of PointToolKeyboardDragListener that moved at constant speed.
 * See https://github.com/phetsims/graphing-quadratics/issues/238#issuecomment-3330220355 for why we switched.
 * See the implementation in https://github.com/phetsims/graphing-quadratics/blob/0c2647c0b39197c4e06cb176c95ad747cb20b965/js/common/view/PointToolKeyboardDragListener.ts.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PointTool from '../model/PointTool.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PointToolNode from './PointToolNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQGraph from '../model/GQGraph.js';
import SoundKeyboardDragListener, { SoundKeyboardDragListenerOptions } from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import GQQueryParameters from '../GQQueryParameters.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import globalKeyStateTracker from '../../../../scenery/js/accessibility/globalKeyStateTracker.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import GQConstants from '../GQConstants.js';

// These constants specify the position delta (dx or dy) each time that drag is called.
const SNAPPED_KEYBOARD_STEP = 0.1;
const SNAPPED_SHIFT_KEYBOARD_STEP = 0.01;
affirm( SNAPPED_SHIFT_KEYBOARD_STEP < SNAPPED_KEYBOARD_STEP );

export default class PointToolKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: GQGraph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const options: SoundKeyboardDragListenerOptions = {
      tandem: tandem,
      transform: modelViewTransform, // so that +y is up
      moveOnHoldDelay: 200,
      moveOnHoldInterval: GQQueryParameters.pointToolMoveOnHoldInterval,

      start: ( event, listener ) => {

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {

        const currentPosition = pointTool.positionProperty.value;
        const currentQuadratic = pointTool.quadraticProperty.value;

        // Compute dx and dy, based on how listener.modelDelta changed.
        // If multiple arrow keys are pressed at the same time, use dx and ignore dy.
        const step = globalKeyStateTracker.shiftKeyDown ? SNAPPED_SHIFT_KEYBOARD_STEP : SNAPPED_KEYBOARD_STEP;
        const dx = Math.sign( listener.modelDelta.x ) * step;
        const dy = ( dx !== 0 ) ? 0 : Math.sign( listener.modelDelta.y ) * step;

        // New tool position, constrained to dragBounds.
        const newPosition = pointTool.dragBounds.closestPointTo( new Vector2( currentPosition.x + dx, currentPosition.y + dy ) );

        if ( !graph.contains( newPosition ) || !graphContentsVisibleProperty.value ) {

          // If the tool is not on the graph, or the graph contents are hidden, then the tool is not snapped to a curve,
          // and it should simply be moved to its new position.
          pointTool.quadraticProperty.value = null;
          pointTool.positionProperty.value = newPosition;
        }
        else if ( currentQuadratic === null ) {

          // The tool is not currently snapped to a curve.
          const snapQuadratic = pointTool.getQuadraticNear( newPosition, GQQueryParameters.snapOnDistance );
          if ( snapQuadratic ) {

            // If the tool is sufficient close to a curve, snap to it.
            pointTool.quadraticProperty.value = snapQuadratic;
            const snapPosition = snapQuadratic.getClosestPoint( newPosition );

            // Round x1 to the number of decimal places that the tool will display. This prevents situations where
            // there would appear to be 2 different y values for the same displayed x value, because snapPosition.x
            // values are different in decimal places that are not displayed.  This was first discovered (and is most
            // common and obvious) with integer snapPosition.x values, but is actually a potential problem with all
            // snapPosition.x values. See https://github.com/phetsims/graphing-quadratics/issues/169 and
            // https://github.com/phetsims/graphing-quadratics/issues/238.
            const x1 = toFixedNumber( snapPosition.x, GQConstants.POINT_TOOL_DECIMALS );
            const y1 = snapQuadratic.solveY( x1 );
            pointTool.positionProperty.value = new Vector2( x1, y1 );
          }
          else {

            // If the tool is not sufficient close to a curve, simply move to the new position.
            pointTool.positionProperty.value = newPosition;
          }
        }
        else {

          // The tool is currently snapped to a curve...
          if ( dy !== 0 && currentQuadratic.isaHorizontalLine() ) {

            // Attempting to use upArrow or downArrow for a horizontal line does nothing.
          }
          else {

            // Move along the curve.
            if ( dx !== 0 ) {

              // leftArrow or rightArrow: advance x by delta, compute y
              const x1 = toFixedNumber( currentPosition.x + dx, GQConstants.POINT_TOOL_DECIMALS );
              const y1 = currentQuadratic.solveY( x1 );
              pointTool.positionProperty.value = new Vector2( x1, y1 );
            }
            else {
              affirm( dy !== 0 );

              // upArrow or downArrow: advance y by delta, compute x
              let x1: number;
              let y1 = toFixedNumber( currentPosition.y + dy, GQConstants.POINT_TOOL_DECIMALS );

              if ( currentQuadratic.isaParabola() ) {

                const vertex = currentQuadratic.vertex!;
                affirm( vertex );
                if ( ( currentQuadratic.a > 0 && y1 <= vertex.y ) || ( currentQuadratic.a < 0 && y1 >= vertex.y ) ) {

                  // The new position would pass the vertex, so snap to the vertex.
                  x1 = vertex.x;
                  y1 = vertex.y;
                }
                else {

                  // A parabola has 2 solutions for x, in ascending order. Look at the tool's position relative to
                  // the axis of symmetry to decide which solution to use.
                  const xValues = currentQuadratic.solveX( y1 )!;
                  affirm( xValues && xValues.length === 2 );
                  const axisOfSymmetry = currentQuadratic.axisOfSymmetry!;
                  affirm( axisOfSymmetry !== undefined );
                  x1 = ( currentPosition.x < axisOfSymmetry ) ? xValues[ 0 ] : xValues[ 1 ];
                }
              }
              else {

                // A line has 1 solution for x.
                const xValues = currentQuadratic.solveX( y1 )!;
                affirm( xValues.length === 1 );
                x1 = xValues[ 0 ];
              }
              pointTool.positionProperty.value = new Vector2( x1, y1 );
            }
          }
        }

        // Describe what the point tool is measuring.
        if ( graphContentsVisibleProperty.value ) {
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    };

    super( options );
  }
}

graphingQuadratics.register( 'PointToolKeyboardDragListener', PointToolKeyboardDragListener );