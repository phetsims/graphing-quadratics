// Copyright 2025, University of Colorado Boulder

/**
 * VertexKeyboardDragListener is the keyboard drag listener for VertexManipulator.
 *
 * Because the vertex moves in integer steps, creating a separate handler for keyboard input was easier than
 * rewriting VertexDragListener to extend SoundRichDragListener.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import VertexManipulator from './VertexManipulator.js';

export default class VertexKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( manipulator: VertexManipulator,
                      hProperty: NumberProperty,
                      kProperty: NumberProperty,
                      tandem: Tandem ) {
    super( {
      isDisposable: false,
      moveOnHoldInterval: 400, // See https://github.com/phetsims/graphing-quadratics/issues/242#issuecomment-3300782241

      /**
       * Move one unit horizontally or vertically each time drag is called.
       * Horizontal movement changes h, vertical movement changes k.
       */
      drag: ( event, listener ) => {

        // Get the current values of h and k.
        let h = hProperty.value;
        let k = kProperty.value;

        // Change the value that corresponds to the drag motion.
        if ( listener.modelDelta.x > 0 ) {
          h++;
        }
        else if ( listener.modelDelta.x < 0 ) {
          h--;
        }
        else if ( listener.modelDelta.y > 0 ) {
          k--;
        }
        else if ( listener.modelDelta.y < 0 ) {
          k++;
        }

        // Constrain to the ranges of h and k.
        h = hProperty.range.constrainValue( h );
        k = kProperty.range.constrainValue( k );

        // Set the new values.
        hProperty.value = h;
        kProperty.value = k;

        // accessibleObjectResponse
        manipulator.doAccessibleObjectResponse();
      },
      tandem: tandem
    } );
  }
}

graphingQuadratics.register( 'VertexKeyboardDragListener', VertexKeyboardDragListener );