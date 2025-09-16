// Copyright 2025, University of Colorado Boulder

/**
 * MoveOffGraphListener is a keyboard shortcut that moves the point tool off the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import PointToolNode from './PointToolNode.js';
import GQGraph from '../model/GQGraph.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class MoveOffGraphListener extends KeyboardListener<OneKeyStroke[]> {

  // Keystroke and metadata for this shortcut.
  public static readonly HOTKEY_DATA = new HotkeyData( {
    keys: [ 'k' ],
    repoName: graphingQuadratics.name,
    keyboardHelpDialogLabelStringProperty: GraphingQuadraticsStrings.keyboardHelpDialog.moveOffGridStringProperty
  } );

  public constructor( pointToolNode: PointToolNode, graph: GQGraph ) {

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ MoveOffGraphListener.HOTKEY_DATA ] ),
      fire: ( event, keysPressed ) => {
        phet.log && phet.log( `${keysPressed} shortcut` );

        // Move to the tool's initial 'off graph' position.
        pointToolNode.pointTool.positionProperty.value = pointToolNode.pointTool.positionProperty.initialValue;

        // Describe the tool's new position.
        pointToolNode.doAccessibleObjectResponse();
      }
    } );
  }
}

graphingQuadratics.register( 'MoveOffGraphListener', MoveOffGraphListener );