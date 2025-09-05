// Copyright 2025, University of Colorado Boulder

/**
 * PointToolRichDragListener is the drag listener for PointToolNode. It supports pointer and keyboard input.
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
import SoundClipPlayer from '../../../../tambo/js/sound-generators/SoundClipPlayer.js';
import click_mp3 from '../../../../tambo/sounds/click_mp3.js';
import SoundRichDragListener, { SoundRichDragListenerOptions } from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQEquationDescriber from '../description/GQEquationDescriber.js';
import GQGraph from '../model/GQGraph.js';

// When the point tool is snapped to a curve, it will also snap to integer x coordinates. This value determines
// how close the point tool's x-coordinate must be in order to snap to the closest integer x-coordinate.
// We decided that the most effective value was the smallest interval that the point tool displays.
// See https://github.com/phetsims/graphing-quadratics/issues/169.
const X_SNAP_TOLERANCE = 1 / Math.pow( 10, GQConstants.POINT_TOOL_DECIMALS );

// Sound that is played when the tool snaps to the quadratic.
const SNAP_SOUND_PLAYER = new SoundClipPlayer( click_mp3, {
  soundClipOptions: {
    initialOutputLevel: 0.7
  },
  soundManagerOptions: {
    categoryName: 'user-interface'
  }
} );

export class PointToolRichDragListener extends SoundRichDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: GQGraph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // Whether the tool is currently snapped to a curve.
    let isSnappedToCurve = false;

    const options: SoundRichDragListenerOptions = {
      positionProperty: pointTool.positionProperty,
      transform: modelViewTransform,
      keyboardDragListenerOptions: {
        dragSpeed: 200,
        shiftDragSpeed: 50
      },

      start: ( event, listener ) => {

        pointTool.isDragging = true;

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {

        // Whether the tool snapped to a curve on this drag step.
        let didSnapToCurve = false;

        // Constrained to dragBounds.
        let position = pointTool.dragBounds.closestPointTo( listener.modelPoint );

        // If we're on the graph and the contents of the graph are visible...
        if ( graph.contains( position ) && graphContentsVisibleProperty.value ) {

          // If we're close enough to a quadratic, snap to that quadratic.
          //TODO https://github.com/phetsims/graphing-quadratics/issues/216 Point tool does not stay on pointTool.quadraticProperty.value when another quadratic is in front.
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

            // Play a sound to emphasize that the tool snapped to the curve.
            if ( !isSnappedToCurve ) {
              SNAP_SOUND_PLAYER.play();
            }
            isSnappedToCurve = true;
            didSnapToCurve = true;

            // "On {{equation}}, use J to jump to next curve, K to move off grid."
            pointToolNode.addAccessibleContextResponse( StringUtils.fillIn( GraphingQuadraticsStrings.a11y.pointToolNode.accessibleContextResponseStringProperty, {
              equation: GQEquationDescriber.createStandardFormDescription( snapQuadratic,
                GraphingQuadraticsStrings.yStringProperty.value,
                GraphingQuadraticsStrings.xStringProperty.value,
                GraphingQuadraticsStrings.a11y.squaredStringProperty.value,
                GraphingQuadraticsStrings.a11y.equalsStringProperty.value,
                GraphingQuadraticsStrings.a11y.plusStringProperty.value,
                GraphingQuadraticsStrings.a11y.minusStringProperty.value,
                GraphingQuadraticsStrings.a11y.negativeStringProperty.value
              ),
              x: toFixedNumber( position.x, GQConstants.POINT_TOOL_DECIMALS ),
              y: toFixedNumber( position.y, GQConstants.POINT_TOOL_DECIMALS )
            } ) );
          }
          else {
            isSnappedToCurve = false;
          }
        }

        // Move the point tool.
        pointTool.positionProperty.value = position;

        // accessibleObjectResponse
        if ( !didSnapToCurve ) {
          pointToolNode.doAccessibleObjectResponse();
        }
      },

      end: ( event, listener ) => {
        pointTool.isDragging = false;
      },

      tandem: tandem
    };

    super( options );
  }
}

graphingQuadratics.register( 'PointToolRichDragListener', PointToolRichDragListener );