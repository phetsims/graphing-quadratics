// Copyright 2018-2025, University of Colorado Boulder

/**
 * VertexDragListener is the drag listener for VertexManipulator.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ManipulatorDragListener from '../../../../graphing-lines/js/common/view/manipulator/ManipulatorDragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListenerOptions, PressedDragListener } from '../../../../scenery/js/listeners/DragListener.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';

export class VertexDragListener extends ManipulatorDragListener {

  /**
   * @param targetNode - the Node that we attached this listener to
   * @param hProperty - h coefficient of vertex form
   * @param kProperty - k coefficient of vertex form
   * @param graph
   * @param modelViewTransform
   * @param [providedOptions]
   */
  public constructor( targetNode: Node, hProperty: NumberProperty, kProperty: NumberProperty, graph: Graph,
                      modelViewTransform: ModelViewTransform2, providedOptions: DragListenerOptions<PressedDragListener> ) {

    let startOffset: Vector2; // where the drag started, relative to the manipulator

    const options = combineOptions<DragListenerOptions<PressedDragListener>>( {

      // note where the drag started
      start: ( event, listener ) => {
        const position = modelViewTransform.modelToViewXY( hProperty.value, kProperty.value );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: ( event, listener ) => {

        // transform the drag point from view to model coordinate frame
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        let position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to the graph
        position = graph.constrain( position );

        // constrain to range and snap to integer grid
        const h = roundSymmetric( hProperty.range.constrainValue( position.x ) );
        const k = roundSymmetric( kProperty.range.constrainValue( position.y ) );

        // Setting h and k separately results in an intermediate Quadratic.
        // We decided that this is OK, and we can live with it.
        hProperty.value = h;
        kProperty.value = k;
      }
    }, providedOptions );

    super( options );
  }
}

graphingQuadratics.register( 'VertexDragListener', VertexDragListener );