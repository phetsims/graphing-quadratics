// Copyright 2018-2020, University of Colorado Boulder

/**
 * IO Type for Quadratic
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Quadratic from './Quadratic.js';

const QuadraticIO = new IOType( 'QuadraticIO', {
  valueType: Quadratic,
  documentation: Quadratic.documentationQuadraticIO,
  toStateObject: quadratic => quadratic.toStateObject(),
  fromStateObject: Quadratic.fromStateObject
} );

graphingQuadratics.register( 'QuadraticIO', QuadraticIO );
export default QuadraticIO;