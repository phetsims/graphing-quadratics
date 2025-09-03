// Copyright 2025, University of Colorado Boulder

/**
 * MoveOffGraphListener is a keyboard shortcut (K) that moves the point tool off the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import PointToolNode from './PointToolNode.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';

export default class MoveOffGraphListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( pointToolNode: PointToolNode, graph: Graph ) {

    const hotkeyData = PointToolNode.MOVE_OFF_GRID_HOTKEY_DATA;

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ hotkeyData ] ),
      fire: ( event, keysPressed ) => {
        if ( hotkeyData.hasKeyStroke( keysPressed ) && graph.contains( pointToolNode.pointTool.positionProperty.value ) ) {
          phet.log && phet.log( `${keysPressed} shortcut` );

          // Move to the tool's initial 'off graph' position.
          pointToolNode.pointTool.positionProperty.value = pointToolNode.pointTool.positionProperty.initialValue;

          // Describe the tool's new position.
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    } );
  }
}

graphingQuadratics.register( 'MoveOffGraphListener', MoveOffGraphListener );