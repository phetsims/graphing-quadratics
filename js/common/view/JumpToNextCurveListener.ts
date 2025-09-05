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

export default class JumpToNextCurveListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( pointToolNode: PointToolNode ) {

    const hotkeyData = PointToolNode.JUMP_TO_NEXT_CURVE_HOTKEY_DATA;

    const pointTool = pointToolNode.pointTool;

    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ hotkeyData ] ),
      fire: ( event, keysPressed ) => {
        if ( hotkeyData.hasKeyStroke( keysPressed ) ) {
          phet.log && phet.log( `${keysPressed} shortcut` );

          // We should have at least 1 Quadratic, the interactive Quadratic.
          const quadratics = pointTool.quadraticsProperty.value;
          affirm( quadratics.length > 0 );

          // Determine which Quadratic to snap to.
          if ( pointTool.quadraticProperty.value ) {

            // Point tool is snapped to a quadratic. Jump to the closest point on the next quadratic in the list.
            if ( quadratics.length > 1 ) {
              const currentQuadratic = pointTool.quadraticProperty.value;
              const indexOfCurrentQuadratic = quadratics.indexOf( currentQuadratic );
              affirm( indexOfCurrentQuadratic !== -1 );

              const indexOfNextQuadratic = ( indexOfCurrentQuadratic === quadratics.length - 1 ) ? 0 : indexOfCurrentQuadratic + 1;
              const nextQuadratic = quadratics[ indexOfNextQuadratic ];
              affirm( nextQuadratic );

              //TODO https://github.com/phetsims/graphing-quadratics/issues/216 getClosestPoint may be off the graph
              //TODO https://github.com/phetsims/graphing-quadratics/issues/216 pointTool.quadraticProperty will not be nextQuadratic if there is another quadratic in front at that position.
              pointTool.positionProperty.value = nextQuadratic.getClosestPoint( pointTool.positionProperty.value );
            }
            else {
              // There is only one Quadratic, and therefore no "next quadratic", so do nothing.
            }
          }
          else {

            // Point tool is NOT snapped to a quadratic. Jump to the first quadratic in the list.
            const firstQuadratic = pointTool.quadraticsProperty.value[ 0 ];
            pointTool.positionProperty.value = firstQuadratic.getClosestPoint( pointTool.positionProperty.value );
          }

          // Describe the tool's new position.
          pointToolNode.doAccessibleObjectResponse();
        }
      }
    } );
  }
}

graphingQuadratics.register( 'JumpToNextCurveListener', JumpToNextCurveListener );