// Copyright 2018-2020, University of Colorado Boulder

/**
 * IO Type for Quadratic
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import validate from '../../../../axon/js/validate.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Quadratic from './Quadratic.js';

class QuadraticIO extends ObjectIO {

  /**
   * Encodes the state of a Quadratic instance.
   * @param {Quadratic} quadratic
   * @returns {*}
   * @public
   * @override
   */
  static toStateObject( quadratic ) {
    validate( quadratic, this.validator );
    return quadratic.toStateObject();
  }

  /**
   * Decodes state into a Quadratic instance.
   * @param {*} stateObject
   * @returns {Quadratic}
   * @public
   * @override
   */
  static fromStateObject( stateObject ) {
    return Quadratic.fromStateObject( stateObject );
  }
}

QuadraticIO.documentation = Quadratic.documentationQuadraticIO;
QuadraticIO.validator = { valueType: Quadratic };
QuadraticIO.typeName = 'QuadraticIO';
ObjectIO.validateSubtype( QuadraticIO );

graphingQuadratics.register( 'QuadraticIO', QuadraticIO );
export default QuadraticIO;