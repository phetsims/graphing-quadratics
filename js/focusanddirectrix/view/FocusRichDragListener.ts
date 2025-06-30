// Copyright 2025, University of Colorado Boulder

/**
 * FocusRichDragListener is the drag listener that supports both pointer and keyboard input for changing the
 * focus of a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import Range from '../../../../dot/js/Range.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';

export class FocusRichDragListener extends SoundRichDragListener {

  /**
   * @param pProperty - p coefficient of alternate vertex form
   * @param quadraticProperty - the interactive quadratic
   * @param yRange - range of the graph's y-axis
   * @param modelViewTransform
   * @param interval - dragging this manipulator changes p to be a multiple of this value, in model coordinate frame
   * @param parentTandem
   */
  public constructor( pProperty: NumberProperty,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      yRange: Range,
                      modelViewTransform: ModelViewTransform2,
                      interval: number,
                      parentTandem: Tandem ) {

    assert && assert( pProperty.range, 'pProperty is missing range' );

    super( {
      transform: modelViewTransform,
      keyboardDragListenerOptions: {
        moveOnHoldInterval: 100
      },
      drag: ( event, listener ) => {

        const vertex = quadraticProperty.value.vertex!;
        assert && assert( vertex, `expected vertex: ${vertex}` );

        let y = pProperty.value + listener.modelDelta.y;

        // constrain to the graph
        y = yRange.constrainValue( y );

        // constrain and round
        let p = pProperty.range.constrainValue( y - vertex.y );
        p = roundToInterval( p, interval );

        // skip over p === 0
        if ( p === 0 ) {
          p = ( pProperty.value > 0 ) ? interval : -interval;
        }
        assert && assert( p !== 0, 'p=0 is not supported' );

        pProperty.value = p;
      },
      tandem: parentTandem
    } );
  }
}

graphingQuadratics.register( 'FocusRichDragListener', FocusRichDragListener );