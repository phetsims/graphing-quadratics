// Copyright 2025, University of Colorado Boulder

/**
 * FocusRichDragListener is the drag listener that supports both pointer and keyboard input for changing the
 * focus of a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import Range from '../../../../dot/js/Range.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import FocusManipulator from './FocusManipulator.js';
import GQConstants from '../../common/GQConstants.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

export class FocusRichDragListener extends SoundRichDragListener {

  /**
   * @param manipulator
   * @param pProperty - p coefficient of alternate vertex form
   * @param quadraticProperty - the interactive quadratic
   * @param yRange - range of the graph's y-axis
   * @param modelViewTransform
   * @param parentTandem
   */
  public constructor( manipulator: FocusManipulator,
                      pProperty: NumberProperty,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      yRange: Range,
                      modelViewTransform: ModelViewTransform2,
                      parentTandem: Tandem ) {

    affirm( pProperty.range, 'pProperty is missing range' );

    super( {
      transform: modelViewTransform,
      keyboardDragListenerOptions: {
        moveOnHoldInterval: 400, // See https://github.com/phetsims/graphing-quadratics/issues/242#issuecomment-3300782241
        dragDelta: modelViewTransform.modelToViewDeltaX( 0.5 ),
        shiftDragDelta: modelViewTransform.modelToViewDeltaX( 0.1 )
      },
      drag: ( event, listener ) => {

        const vertex = quadraticProperty.value.vertex!;
        affirm( vertex, `expected vertex: ${vertex}` );

        let y = pProperty.value + vertex.y + listener.modelDelta.y;

        // constrain to the graph
        y = yRange.constrainValue( y );

        // constrain and round
        let p = pProperty.range.constrainValue( y - vertex.y );
        p = roundToInterval( p, GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P );

        // skip over p === 0
        if ( p === 0 ) {
          p = ( pProperty.value > 0 ) ? GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P : -GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P;
        }
        affirm( p !== 0, 'p=0 is not supported' );

        pProperty.value = p;

        // accessibleObjectResponse
        manipulator.doAccessibleObjectResponse();
      },
      tandem: parentTandem
    } );
  }
}

graphingQuadratics.register( 'FocusRichDragListener', FocusRichDragListener );