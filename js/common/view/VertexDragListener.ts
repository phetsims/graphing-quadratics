// Copyright 2025, University of Colorado Boulder

/**
 * VertexDragListener is the drag listener for VertexManipulator.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export class VertexDragListener extends SoundDragListener {

  /**
   * @param hProperty - h coefficient of vertex form
   * @param kProperty - k coefficient of vertex form
   * @param graph
   * @param modelViewTransform
   * @param tandem
   */
  public constructor( hProperty: NumberProperty,
                      kProperty: NumberProperty,
                      graph: Graph,
                      modelViewTransform: ModelViewTransform2,
                      tandem: Tandem ) {

    super( {
      transform: modelViewTransform,
      drag: ( event, listener ) => {

        // constrain to the graph
        const position = graph.constrain( listener.modelPoint );

        // constrain to range and snap to integer grid
        const h = roundSymmetric( hProperty.range.constrainValue( position.x ) );
        const k = roundSymmetric( kProperty.range.constrainValue( position.y ) );

        // Setting h and k separately results in an intermediate Quadratic.
        // We decided that this is OK, and we can live with it.
        hProperty.value = h;
        kProperty.value = k;
      },
      tandem: tandem
    } );
  }
}

graphingQuadratics.register( 'VertexDragListener', VertexDragListener );