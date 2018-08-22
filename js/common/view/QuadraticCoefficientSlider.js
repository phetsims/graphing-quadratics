// Copyright 2018, University of Colorado Boulder

/**
 * Slider for the quadratic term's coefficient. The slider has a quadratic response.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/CoefficientSlider' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Util = require( 'DOT/Util' );

  class QuadraticCoefficientSlider extends CoefficientSlider {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = options || {};

      assert && assert( Math.abs( coefficientProperty.range.min ) === coefficientProperty.range.max,
        'symmetrical range is required: ' + coefficientProperty.range );

      // coefficient for quadratic equation y = ax^2
      const a = 1 / coefficientProperty.range.max;

      // map coefficientProperty value to slider value, x = sqrt( y / a )
      assert && assert( !options.map, 'QuadraticCoefficientSlider sets map' );
      options.map = function( value ) {
        return Util.sign( value ) * Math.sqrt( Math.abs( value ) / a );
      };

      // map slider value to coefficientProperty value, y = ax^2
      assert && assert( !options.inverseMap, 'QuadraticCoefficientSlider sets inverseMap' );
      options.inverseMap = function( value ) {
        return Util.sign( value ) * a * value * value;
      };

      assert && assert( options.snapToZeroEpsilon === undefined, 'QuadraticCoefficientSlider sets snapToZeroEpsilon' );
      options.snapToZeroEpsilon = 0.05;

      super( symbol, coefficientProperty, options );
    }
  }

  return graphingQuadratics.register( 'QuadraticCoefficientSlider', QuadraticCoefficientSlider );
} );