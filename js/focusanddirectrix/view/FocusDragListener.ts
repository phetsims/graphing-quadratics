// Copyright 2025, University of Colorado Boulder

/**
 * FocusDragListener is the drag listener for FocusManipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import Range from '../../../../dot/js/Range.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export class FocusDragListener extends SoundDragListener {

  /**
   * @param targetNode - the Node that we attached this listener to
   * @param pProperty - p coefficient of alternate vertex form
   * @param quadraticProperty - the interactive quadratic
   * @param yRange - range of the graph's y-axis
   * @param modelViewTransform
   * @param interval - dragging this manipulator changes p to be a multiple of this value, in model coordinate frame
   * @param tandem
   */
  public constructor( targetNode: Node,
                      pProperty: NumberProperty,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      yRange: Range,
                      modelViewTransform: ModelViewTransform2,
                      interval: number,
                      tandem: Tandem ) {

    assert && assert( pProperty.range, 'pProperty is missing range' );

    super( {
      transform: modelViewTransform,

      drag: ( event, listener ) => {

        const vertex = quadraticProperty.value.vertex!;
        assert && assert( vertex, `expected vertex: ${vertex}` );

        const position = listener.modelPoint;

        // constrain to the graph
        const y = yRange.constrainValue( position.y );

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
      tandem: tandem
    } );
  }
}

graphingQuadratics.register( 'FocusDragListener', FocusDragListener );