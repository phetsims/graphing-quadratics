// Copyright 2025, University of Colorado Boulder

/**
 * PointToolDragListener is the drag listener for PointToolNode.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PointTool from '../model/PointTool.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { DragListenerOptions, PressedDragListener } from '../../../../scenery/js/listeners/DragListener.js';
import GQConstants from '../GQConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import GQQueryParameters from '../GQQueryParameters.js';
import PointToolNode from './PointToolNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';

// When the point tool is snapped to a curve, it will also snap to integer x coordinates. This value determines
// how close the point tool's x-coordinate must be in order to snap to the closest integer x-coordinate.
// We decided that the most effective value was the smallest interval that the point tool displays.
// See https://github.com/phetsims/graphing-quadratics/issues/169.
const X_SNAP_TOLERANCE = 1 / Math.pow( 10, GQConstants.POINT_TOOL_DECIMALS );

export class PointToolDragListener extends SoundDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: DragListenerOptions<PressedDragListener> ) {

    const options = combineOptions<DragListenerOptions<PressedDragListener>>( {
      isDisposable: false,
      transform: modelViewTransform,

      start: ( event, listener ) => {

        pointTool.isDragging = true;

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {

        // Constrained to dragBounds.
        let position = pointTool.dragBounds.closestPointTo( listener.modelPoint );

        // If we're on the graph and the contents of the graph are visible...
        if ( graph.contains( position ) && graphContentsVisibleProperty.value ) {

          // If we're close enough to a quadratic, snap to that quadratic.
          const snapQuadratic = pointTool.getQuadraticNear( position, GQQueryParameters.snapOffDistance, GQQueryParameters.snapOnDistance );
          if ( snapQuadratic ) {

            // Get the closest point that is on the quadratic.
            position = snapQuadratic.getClosestPoint( position );

            // We will be snapping the x value as it will be displayed by the point tool.
            // See https://github.com/phetsims/graphing-quadratics/issues/169.
            let x = toFixedNumber( position.x, GQConstants.POINT_TOOL_DECIMALS );

            // If x is close to an integer value, snap to that integer value.
            // See https://github.com/phetsims/graphing-quadratics/issues/169.
            const closestInteger = toFixedNumber( x, 0 );
            if ( Math.abs( x - closestInteger ) < X_SNAP_TOLERANCE ) {
              x = closestInteger;
            }

            const y = snapQuadratic.solveY( x );
            position = new Vector2( x, y );
          }
        }

        // Move the point tool.
        pointTool.positionProperty.value = position;

        // accessibleObjectResponse
        pointToolNode.doAccessibleObjectResponse();
      },

      end: () => {
        pointTool.isDragging = false;
      }
    }, providedOptions );

    super( options );
  }
}

graphingQuadratics.register( 'PointToolDragListener', PointToolDragListener );