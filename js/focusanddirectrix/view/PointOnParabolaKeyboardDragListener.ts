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
        //TODO https://github.com/phetsims/graphing-quadratics/issues/249

        // accessibleObjectResponse
        manipulator.doAccessibleObjectResponse();
      }
    } );
  }
}

graphingQuadratics.register( 'PointOnParabolaKeyboardDragListener', PointOnParabolaKeyboardDragListener );