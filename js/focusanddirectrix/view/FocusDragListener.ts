// Copyright 2025, University of Colorado Boulder

/**
 * FocusDragListener is the drag listener for FocusManipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ManipulatorDragListener from '../../../../graphing-lines/js/common/view/manipulator/ManipulatorDragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import Range from '../../../../dot/js/Range.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListenerOptions, PressedDragListener } from '../../../../scenery/js/listeners/DragListener.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export class FocusDragListener extends ManipulatorDragListener {

  /**
   * @param targetNode - the Node that we attached this listener to
   * @param pProperty - p coefficient of alternate vertex form
   * @param quadraticProperty - the interactive quadratic
   * @param yRange - range of the graph's y-axis
   * @param modelViewTransform
   * @param interval - dragging this manipulator changes p to be a multiple of this value, in model coordinate frame
   * @param [providedOptions]
   */
  public constructor( targetNode: Node, pProperty: NumberProperty, quadraticProperty: TReadOnlyProperty<Quadratic>,
                      yRange: Range, modelViewTransform: ModelViewTransform2, interval: number,
                      providedOptions: DragListenerOptions<PressedDragListener> ) {

    assert && assert( pProperty.range, 'pProperty is missing range' );

    let startOffset: Vector2; // where the drag started, relative to the manipulator

    const options = combineOptions<DragListenerOptions<PressedDragListener>>( {

      // note where the drag started
      start: ( event, listener ) => {

        const focus = quadraticProperty.value.focus!;
        assert && assert( focus, `expected focus: ${focus}` );

        const position = modelViewTransform.modelToViewPosition( focus );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: ( event, listener ) => {

        const vertex = quadraticProperty.value.vertex!;
        assert && assert( vertex, `expected vertex: ${vertex}` );

        // transform the drag point from view to model coordinate frame
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to the graph
        const y = yRange.constrainValue( position.y );

        // constrain and round
        let p = pProperty.range.constrainValue( y - vertex.y );
        p = Utils.roundToInterval( p, interval );

        // skip over p === 0
        if ( p === 0 ) {
          p = ( pProperty.value > 0 ) ? interval : -interval;
        }
        assert && assert( p !== 0, 'p=0 is not supported' );

        pProperty.value = p;
      }
    }, providedOptions );

    super( options );
  }
}

graphingQuadratics.register( 'FocusDragListener', FocusDragListener );