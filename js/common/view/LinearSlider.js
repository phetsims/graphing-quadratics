// Copyright 2023, University of Colorado Boulder

/**
 * LinearSlider is a vertical slider that has a linear taper.
 * This slider is used for the 'b', 'c', 'p', 'h', and 'k' coefficients.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GQSlider from './GQSlider.js';

export default class LinearSlider extends GQSlider {

  /**
   * @param {string} symbol - the coefficient's symbol
   * @param {NumberProperty} coefficientProperty - the coefficient's value
   * @param {Object} [options]
   */
  constructor( symbol, coefficientProperty, options ) {
    super( symbol, coefficientProperty, options );
  }
}

graphingQuadratics.register( 'LinearSlider', LinearSlider );