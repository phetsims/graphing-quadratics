// Copyright 2025, University of Colorado Boulder

/**
 * PointOnParabolaKeyboardDragListener is the drag listener that handles keyboard input for PointOnParabolaManipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import PointOnParabolaManipulator from './PointOnParabolaManipulator.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQQueryParameters from '../../common/GQQueryParameters.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import globalKeyStateTracker from '../../../../scenery/js/accessibility/globalKeyStateTracker.js';

// These constants specify the position delta (dx or dy) each time that drag is called.
const SNAPPED_KEYBOARD_STEP = 0.1;
const SNAPPED_SHIFT_KEYBOARD_STEP = 0.01;
affirm( SNAPPED_SHIFT_KEYBOARD_STEP < SNAPPED_KEYBOARD_STEP );

export default class PointOnParabolaKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( manipulator: PointOnParabolaManipulator,
                      pointOnParabolaProperty: Property<Vector2>,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      tandem: Tandem ) {

    super( {
      tandem: tandem,
      transform: modelViewTransform, // so that +y is up
      moveOnHoldDelay: 200,
      moveOnHoldInterval: GQQueryParameters.pointOnParabolaMoveOnHoldInterval,

      drag: ( event, listener ) => {

        // Compute dx and dy, based on how listener.modelDelta changed.
        // If multiple arrow keys are pressed at the same time, use dx and ignore dy.
        const step = globalKeyStateTracker.shiftKeyDown ? SNAPPED_SHIFT_KEYBOARD_STEP : SNAPPED_KEYBOARD_STEP;
        const dx = Math.sign( listener.modelDelta.x ) * step;
        const dy = ( dx !== 0 ) ? 0 : Math.sign( listener.modelDelta.y ) * step;

        // Coordinates of the new point on parabola.
        let x1;
        let y1;

        if ( dx !== 0 ) {

          // Using leftArrow or rightArrow, so simply change x and compute y.
          x1 = graph.xRange.constrainValue( pointOnParabolaProperty.value.x + dx );
          y1 = quadraticProperty.value.solveY( x1 );
        }
        else {
          // Using leftArrow or rightArrow.
          affirm( dy !== 0 );

          const quadratic = quadraticProperty.value;
          affirm( quadratic.isaParabola(), 'Quadratic should always be a parabola in Focus & Directrix screen.' );
          const vertex = quadratic.vertex;
          affirm( vertex );

          // Constrain y to the graph.
          y1 = graph.yRange.constrainValue( pointOnParabolaProperty.value.y + dy );

          if ( ( quadratic.a > 0 && y1 <= vertex.y ) || ( quadratic.a < 0 && y1 >= vertex.y ) ) {

            // The new y-coordinate would pass the vertex, so snap to the vertex.
            x1 = vertex.x;
            y1 = vertex.y;
          }
          else {
            const xSolutions = quadratic.solveX( y1 )!;
            affirm( xSolutions !== null, `no solutions for y=${y1}` );

            // If there are 2 solutions for x, choose the closer of the 2 solutions.
            const x0 = pointOnParabolaProperty.value.x;
            x1 = xSolutions[ 0 ];
            if ( xSolutions.length > 1 ) {
              x1 = ( Math.abs( xSolutions[ 0 ] - x0 ) < Math.abs( xSolutions[ 1 ] - x0 ) ) ?
                   xSolutions[ 0 ] :
                   xSolutions[ 1 ];
            }
          }
        }

        pointOnParabolaProperty.value = new Vector2( x1, y1 );

        // accessibleObjectResponse
        manipulator.doAccessibleObjectResponse();
      }
    } );
  }
}

graphingQuadratics.register( 'PointOnParabolaKeyboardDragListener', PointOnParabolaKeyboardDragListener );