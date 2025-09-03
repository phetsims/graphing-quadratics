// Copyright 2025, University of Colorado Boulder

/**
 * JumpToNextCurveListener is a keyboard shortcut (J) that jumps the point tool to the closest point on the next curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import PointToolNode from './PointToolNode.js';

export default class JumpToNextCurveListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( pointToolNode: PointToolNode ) {

    const hotkeyData = PointToolNode.JUMP_TO_NEXT_CURVE_HOTKEY_DATA;

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ hotkeyData ] ),
      fire: ( event, keysPressed ) => {
        if ( hotkeyData.hasKeyStroke( keysPressed ) ) {
          phet.log && phet.log( `${keysPressed} shortcut` );

          // Jump to the closest point on the next curve that is displayed on the graph.
          //TODO https://github.com/phetsims/graphing-quadratics/issues/216

          // Describe the tool's new position.
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    } );
  }
}

graphingQuadratics.register( 'JumpToNextCurveListener', JumpToNextCurveListener );