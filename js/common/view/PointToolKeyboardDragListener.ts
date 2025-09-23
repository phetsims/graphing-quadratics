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

        let newPosition = new Vector2( currentPosition.x + listener.modelDelta.x, currentPosition.y + listener.modelDelta.y );

        // Constrain to dragBounds.
        newPosition = pointTool.dragBounds.closestPointTo( newPosition );

        if ( !graph.contains( newPosition ) || !graphContentsVisibleProperty.value ) {

          // If the tool is not on the graph, or the graph contents are hidden, then the tool is not snapped to a curve,
          // and it should simply be moved to its new position.
          pointTool.quadraticProperty.value = null;
          pointTool.positionProperty.value = newPosition;
        }
        else if ( pointTool.quadraticProperty.value ) {

          // If the tool is snapped to a curve, move along that curve.
          //TODO https://github.com/phetsims/graphing-quadratics/issues/216
        }
        else {

          // Find a curve that is close to the tool, and snap to it. If no curve is found, simply move to the new position.
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