// Copyright 2018-2025, University of Colorado Boulder

/**
 * PointOnParabolaDragListener is the drag listener that supports both pointer and keyboard input for changing
 * the point on the parabola.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';

export class PointOnParabolaDragListener extends SoundRichDragListener {

  /**
   * @param pointOnParabolaProperty - the point
   * @param quadraticProperty - the interactive quadratic
   * @param modelViewTransform
   * @param graph
   * @param parentTandem
   */
  public constructor( pointOnParabolaProperty: Property<Vector2>,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      parentTandem: Tandem ) {

    super( {
      transform: modelViewTransform,
      keyboardDragListenerOptions: {
        dragSpeed: 500,
        shiftDragSpeed: 50
      },
      drag: ( event, listener ) => {

        const point = pointOnParabolaProperty.value.plus( listener.modelDelta );

        // get the closest point on the parabola
        const pointOnParabola = quadraticProperty.value.getClosestPoint( point );

        // constrain to the range of the graph. x & y may both be out of range.
        if ( !graph.xRange.contains( pointOnParabola.x ) ) {

          // x is out of range, so constrain x, and solve for y
          pointOnParabola.setX( graph.xRange.constrainValue( pointOnParabola.x ) );
          pointOnParabola.setY( quadraticProperty.value.solveY( pointOnParabola.x ) );
        }

        if ( !graph.yRange.contains( pointOnParabola.y ) ) {

          // y is out of range, so constrain y, solve for x, and choose the closer of the 2 solutions
          pointOnParabola.setY( graph.yRange.constrainValue( pointOnParabola.y ) );
          const xSolutions = quadraticProperty.value.solveX( pointOnParabola.y )!;
          assert && assert( xSolutions && xSolutions.length === 2, `expected 2 solutions for x: ${xSolutions}` );
          const xClosest = ( Math.abs( xSolutions[ 0 ] - pointOnParabola.x ) < Math.abs( xSolutions[ 1 ] - pointOnParabola.x ) )
                           ? xSolutions[ 0 ] : xSolutions[ 1 ];
          pointOnParabola.setX( xClosest );
        }

        // Snap to the x value as it will be displayed, by solving for y.
        // This is so we don't see different y values for the same x value.
        // See https://github.com/phetsims/graphing-quadratics/issues/172.
        const x = toFixedNumber( pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS );
        const y = quadraticProperty.value.solveY( x );

        pointOnParabolaProperty.value = new Vector2( x, y );
      },
      tandem: parentTandem
    } );
  }
}

graphingQuadratics.register( 'PointOnParabolaDragListener', PointOnParabolaDragListener );