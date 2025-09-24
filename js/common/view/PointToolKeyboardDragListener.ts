// Copyright 2025, University of Colorado Boulder

/**
 * PointToolKeyboardDragListener handles keyboard input for a point tool.
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

// When the tool is snapped to a curve, these constants specify the distance to move along the curve for each drag event.
const SNAPPED_KEYBOARD_STEP = 0.1;
const SNAPPED_SHIFT_KEYBOARD_STEP = 0.01;
affirm( SNAPPED_SHIFT_KEYBOARD_STEP < SNAPPED_KEYBOARD_STEP );

export class PointToolKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: GQGraph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const options: SoundKeyboardDragListenerOptions = {
      tandem: tandem,
      transform: modelViewTransform,
      dragSpeed: 200,
      shiftDragSpeed: 50,

      start: ( event, listener ) => {

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {

        const currentPosition = pointTool.positionProperty.value;
        const currentQuadratic = pointTool.quadraticProperty.value;

        let newPosition = new Vector2( currentPosition.x + listener.modelDelta.x, currentPosition.y + listener.modelDelta.y );

        // Constrain to dragBounds.
        newPosition = pointTool.dragBounds.closestPointTo( newPosition );

        if ( !graph.contains( newPosition ) || !graphContentsVisibleProperty.value ) {

          // If the tool is not on the graph, or the graph contents are hidden, then the tool is not snapped to a curve,
          // and it should simply be moved to its new position.
          pointTool.quadraticProperty.value = null;
          pointTool.positionProperty.value = newPosition;
        }
        else if ( currentQuadratic !== null ) {

          // The tool is currently snapped to a curve, so move along the curve.

          if ( listener.modelDelta.x === 0 && currentQuadratic.isaHorizontalLine() ) {

            // Attempting to use upArrow or downArrow for a horizontal line, so do nothing.
          }
          else if ( listener.modelDelta.x === 0 && currentQuadratic.vertex !== undefined &&
                    ( ( currentQuadratic.a > 0 && newPosition.y <= currentQuadratic.vertex.y ) ||
                      ( currentQuadratic.a < 0 && newPosition.y >= currentQuadratic.vertex.y ) ) ) {

            // With leftArrow or rightArrow, the new position would pass the vertex, so snap to the vertex.
            pointTool.positionProperty.value = currentQuadratic.vertex;
          }
          else {

            // The tool is snapped to a curve. Move along that curve at constant speed, using a numerical solution
            // to find the next point on the quadratic. The numerical solution is a modified Euler's method, described
            // by Google AI Overview with prompt "numerical method Euler to find constant distance on parabola".
            // The variables in this algorithm are:
            // d is the distance to move along the parabola. This quantity is signed.
            // (x0,y0) is the current position of the point tool.
            // (x1,y1) is the next position of the point tool.
            const x0 = pointTool.positionProperty.value.x;
            const dAbs = globalKeyStateTracker.shiftKeyDown ? SNAPPED_SHIFT_KEYBOARD_STEP : SNAPPED_KEYBOARD_STEP;
            let d: number;
            if ( listener.modelDelta.x !== 0 ) {

              // leftArrow or rightArrow was used, so d is straightforward and (because our parabola only opens up
              // or down, not left or right) works with all types of curves. Note that if multiple arrow keys are
              // pressed at the same time, we prefer the horizontal movement and ignore the vertical movement.
              d = ( newPosition.x > x0 ) ? dAbs : -dAbs;
            }
            else if ( currentQuadratic.isaLine() ) {

              // upArrow or downArrow was used with a straight line. Determine the sign of d based on the slope.
              if ( listener.modelDelta.y > 0 ) {
                d = ( currentQuadratic.b > 0 ) ? dAbs : -dAbs;
              }
              else {
                d = ( currentQuadratic.b > 0 ) ? -dAbs : dAbs;
              }
            }
            else {
              affirm( currentQuadratic.isaParabola() );
              const axisOfSymmetry = currentQuadratic.axisOfSymmetry!;
              affirm( axisOfSymmetry !== undefined );

              // upArrow or downArrow was used with a parabola. Determine the sign of d based on whether the parabola
              // opens up or down (value of a), and which side of the axis of symmetry the point tool is on.
              if ( newPosition.x >= axisOfSymmetry ) {

                // Tool is to the right of the axisOfSymmetry.
                if ( currentQuadratic.a > 0 ) {
                  // Parabola opens upward.
                  d = ( listener.modelDelta.y > 0 ) ? dAbs : -dAbs;
                }
                else {
                  // Parabola opens downward.
                  d = ( listener.modelDelta.y > 0 ) ? -dAbs : dAbs;
                }
              }
              else {

                // Tool is to the left of the axisOfSymmetry.
                if ( currentQuadratic.a > 0 ) {
                  // Parabola opens upward.
                  d = ( listener.modelDelta.y > 0 ) ? -dAbs : dAbs;
                }
                else {
                  // Parabola opens downward.
                  d = ( listener.modelDelta.y > 0 ) ? dAbs : -dAbs;
                }
              }
            }

            // Now that we have d (with a sign), compute the tool's new position on the curve.
            const dx = d / Math.sqrt( 1 + Math.pow( currentQuadratic.derivative( x0 ), 2 ) );
            const x1 = x0 + dx;
            const y1 = currentQuadratic.solveY( x1 );
            pointTool.positionProperty.value = new Vector2( x1, y1 );
          }
        }
        else {

          // The tool is not currently snapped to a curve. Find a curve that is close to the tool, and snap to it.
          // If no curve is found, simply move to the new position.
          const snapQuadratic = pointTool.getQuadraticNear( newPosition, GQQueryParameters.snapOnDistance );
          pointTool.quadraticProperty.value = snapQuadratic;
          if ( snapQuadratic ) {
            pointTool.positionProperty.value = snapQuadratic.getClosestPoint( newPosition );
            PointToolNode.SNAP_TO_CURVE_SOUND_PLAYER.play();
          }
          else {
            pointTool.positionProperty.value = newPosition;
          }
        }

        // Describe what the point tool is measuring.
        pointToolNode.doAccessibleObjectResponse();
      }
    };

    super( options );
  }
}

graphingQuadratics.register( 'PointToolKeyboardDragListener', PointToolKeyboardDragListener );