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
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Quadratic from '../model/Quadratic.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class JumpToNextCurveListener extends KeyboardListener<OneKeyStroke[]> {

  // Keystroke and metadata for this shortcut.
  public static readonly HOTKEY_DATA = new HotkeyData( {
    keys: [ 'j' ],
    repoName: graphingQuadratics.name,
    keyboardHelpDialogLabelStringProperty: GraphingQuadraticsStrings.keyboardHelpDialog.jumpToNextCurveStringProperty
  } );

  public constructor( pointToolNode: PointToolNode ) {

    const pointTool = pointToolNode.pointTool;

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ JumpToNextCurveListener.HOTKEY_DATA ] ),
      fire: ( event, keysPressed ) => {

        // If the 'J' key was pressed...
        if ( JumpToNextCurveListener.HOTKEY_DATA.hasKeyStroke( keysPressed ) ) {
          phet.log && phet.log( `${keysPressed} shortcut` );

          // We should have at least 1 Quadratic, the interactive Quadratic.
          const quadratics = pointTool.quadraticsProperty.value;
          affirm( quadratics.length > 0 );

          // Determine which Quadratic to snap to.
          let nextQuadratic: Quadratic | null;
          if ( pointTool.quadraticProperty.value ) {

            // Point tool is snapped to a quadratic. Jump to the next quadratic in the list, at the point that is closest to the origin.
            if ( quadratics.length > 1 ) {
              const currentQuadratic = pointTool.quadraticProperty.value;
              const indexOfCurrentQuadratic = quadratics.indexOf( currentQuadratic );
              affirm( indexOfCurrentQuadratic !== -1 );

              const indexOfNextQuadratic = ( indexOfCurrentQuadratic === quadratics.length - 1 ) ? 0 : indexOfCurrentQuadratic + 1;
              nextQuadratic = quadratics[ indexOfNextQuadratic ];
              affirm( nextQuadratic );
            }
            else {
              // There is only one Quadratic, and therefore no "next quadratic", so do nothing.
              nextQuadratic = null;
            }
          }
          else {

            // Point tool is NOT snapped to a quadratic. Jump to the first quadratic in the list.
            nextQuadratic = pointTool.quadraticsProperty.value[ 0 ];
          }

          // Jump to the next curve, at a point that is closest to the origin. This guarantees that the point will be on the graph.
          if ( nextQuadratic ) {
            pointTool.quadraticProperty.value = nextQuadratic;
            pointTool.positionProperty.value = nextQuadratic.getClosestPoint( Vector2.ZERO );
          }

          // Describe the tool's new position.
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    } );
  }
}

graphingQuadratics.register( 'JumpToNextCurveListener', JumpToNextCurveListener );