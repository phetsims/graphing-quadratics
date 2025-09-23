// Copyright 2025, University of Colorado Boulder

/**
 * PointToolDragListener handles pointer input for a point tool.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PointTool from '../model/PointTool.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import GQConstants from '../GQConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import GQQueryParameters from '../GQQueryParameters.js';
import PointToolNode from './PointToolNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQGraph from '../model/GQGraph.js';
import SoundDragListener, { SoundDragListenerOptions } from '../../../../scenery-phet/js/SoundDragListener.js';
import Quadratic from '../model/Quadratic.js';

export class PointToolDragListener extends SoundDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: GQGraph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // Whether the tool is currently snapped to a curve.
    let isSnappedToCurve = false;

    const options: SoundDragListenerOptions = {
      tandem: tandem,
      transform: modelViewTransform,

      start: ( event, listener ) => {

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {

        // Constrain to dragBounds.
        let position = pointTool.dragBounds.closestPointTo( listener.modelPoint );

        let snapQuadratic: Quadratic | null = null;

        // If we're on the graph and the contents of the graph are visible...
        if ( graph.contains( position ) && graphContentsVisibleProperty.value ) {

          // Locate a curve that is close enough to snap to, preferring the curve that the tool is already snapped to.
          snapQuadratic = pointTool.quadraticProperty.value;
          if ( !snapQuadratic?.hasSolution( position, GQQueryParameters.snapOffDistance ) ) {
            snapQuadratic = pointTool.getQuadraticNear( position, GQQueryParameters.snapOnDistance );
          }

          // If we're close enough to a curve, snap to that curve.
          if ( snapQuadratic ) {

            // Get the closest point that is on the curve.
            position = snapQuadratic.getClosestPoint( position );

            // If the x-coordinate will be displayed as an integer, snap to that integer value.
            // See https://github.com/phetsims/graphing-quadratics/issues/169.
            let x = position.x;
            const xDisplayed = toFixedNumber( x, GQConstants.POINT_TOOL_DECIMALS );
            if ( Number.isInteger( xDisplayed ) ) {
              x = xDisplayed;
              phet.log && phet.log( `pointTool snapped to integer x = ${x}` );
            }

            // After adjusting x, solve for y.
            const y = snapQuadratic.solveY( x );

            // The tool's new position, snapped to the curve.
            position = new Vector2( x, y );

            // Play a sound to emphasize that the tool snapped to the curve.
            if ( !isSnappedToCurve ) {
              PointToolNode.SNAP_TO_CURVE_SOUND_PLAYER.play();
              isSnappedToCurve = true;
            }
          }
          else {
            isSnappedToCurve = false;
          }
        }

        pointTool.quadraticProperty.value = snapQuadratic;

        // Move the point tool.
        pointTool.positionProperty.value = position;

        // Describe what the point tool is measuring.
        pointToolNode.doAccessibleObjectResponse();
      }
    };

    super( options );
  }
}

graphingQuadratics.register( 'PointToolDragListener', PointToolDragListener );