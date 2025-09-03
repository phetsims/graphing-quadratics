// Copyright 2025, University of Colorado Boulder

/**
 * MoveOffGridListener is a keyboard shortcut that moves the point tool off the grid.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import PointToolNode from './PointToolNode.js';

export default class MoveOffGridListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( pointToolNode: PointToolNode ) {

    const hotkeyData = PointToolNode.MOVE_OFF_GRID_HOTKEY_DATA;

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ hotkeyData ] ),
      fire: ( event, keysPressed ) => {
        if ( hotkeyData.hasKeyStroke( keysPressed ) ) {

          // Jump to the tool's initial 'off grid' position.
          pointToolNode.pointTool.positionProperty.value = pointToolNode.pointTool.positionProperty.initialValue;

          // Describe the tool's new position.
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    } );
  }
}

graphingQuadratics.register( 'MoveOffGridListener', MoveOffGridListener );