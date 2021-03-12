// Copyright 2018-2020, University of Colorado Boulder

/**
 * QuadraticSlider is a vertical slider that has a quadratic taper.
 * While the implementation is general, this slider is used for the 'a' coefficient in the Explore screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GQSlider from './GQSlider.js';

class QuadraticSlider extends GQSlider {

  /**
   * @param {string} symbol - the coefficient's symbol
   * @param {NumberProperty} coefficientProperty - the coefficient's value
   * @param {Object} [options]
   */
  constructor( symbol, coefficientProperty, options ) {

    options = options || {};

    assert && assert( Math.abs( coefficientProperty.range.min ) === coefficientProperty.range.max,
      `symmetrical range is required: ${coefficientProperty.range}` );

    // coefficient for quadratic equation y = ax^2
    const a = 1 / coefficientProperty.range.max;

    // map coefficientProperty.value to slider value, x = sqrt( y / a )
    assert && assert( !options.map, 'QuadraticSlider sets map' );
    options.map = value => ( Math.sign( value ) * Math.sqrt( Math.abs( value ) / a ) );

    // map slider value to coefficientProperty.value, y = ax^2
    assert && assert( !options.inverseMap, 'QuadraticSlider sets inverseMap' );
    options.inverseMap = value => ( Math.sign( value ) * a * value * value );

    super( symbol, coefficientProperty, options );
  }
}

graphingQuadratics.register( 'QuadraticSlider', QuadraticSlider );
export default QuadraticSlider;