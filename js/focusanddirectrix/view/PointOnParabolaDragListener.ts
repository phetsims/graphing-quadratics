// Copyright 2018-2025, University of Colorado Boulder

/**
 * PointOnParabolaDragListener is the drag listener that handles pointer input for PointOnParabolaManipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import PointOnParabolaManipulator from './PointOnParabolaManipulator.js';

export default class PointOnParabolaDragListener extends SoundDragListener {

  public constructor( manipulator: PointOnParabolaManipulator,
                      pointOnParabolaProperty: Property<Vector2>,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      modelViewTransform: ModelViewTransform2,
                      graph: Graph,
                      tandem: Tandem ) {

    let startOffset: Vector2; // where the drag started, relative to the manipulator

    super( {

      // Note where the drag started.
      start: ( event, listener ) => {
        const position = modelViewTransform.modelToViewPosition( pointOnParabolaProperty.value );
        startOffset = manipulator.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: ( event, listener ) => {

        // Transform the drag point from view to model coordinate frame.
        const parentPoint = manipulator.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const point = modelViewTransform.viewToModelPosition( parentPoint );

        // Get the closest point on the parabola.
        const pointOnParabola = quadraticProperty.value.getClosestPoint( point );

        // If x is out of range, constrain x, and solve for y.
        if ( !graph.xRange.contains( pointOnParabola.x ) ) {
          pointOnParabola.setX( graph.xRange.constrainValue( pointOnParabola.x ) );
          pointOnParabola.setY( quadraticProperty.value.solveY( pointOnParabola.x ) );
        }

        // If y is out of range, constrain y, solve for x.
        if ( !graph.yRange.contains( pointOnParabola.y ) ) {
          pointOnParabola.setY( graph.yRange.constrainValue( pointOnParabola.y ) );
          const xSolutions = quadraticProperty.value.solveX( pointOnParabola.y )!;
          affirm( xSolutions !== null, `no solutions for y=${pointOnParabola.y}` );

          // If there are 2 solutions for x, choose the closer of the 2 solutions.
          let x1 = xSolutions[ 0 ];
          if ( xSolutions.length > 1 ) {
            x1 = ( Math.abs( xSolutions[ 0 ] - pointOnParabola.x ) < Math.abs( xSolutions[ 1 ] - pointOnParabola.x ) ) ?
                 xSolutions[ 0 ] :
                 xSolutions[ 1 ];
          }
          pointOnParabola.setX( x1 );
        }

        // Snap to the x value as it will be displayed, by solving for y.
        // This is so we don't see different y values for the same x value.
        // See https://github.com/phetsims/graphing-quadratics/issues/172.
        const x = toFixedNumber( pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS );
        const y = quadraticProperty.value.solveY( x );

        pointOnParabolaProperty.value = new Vector2( x, y );

        // accessibleObjectResponse
        manipulator.doAccessibleObjectResponse();
      },
      tandem: tandem
    } );
  }
}

graphingQuadratics.register( 'PointOnParabolaDragListener', PointOnParabolaDragListener );