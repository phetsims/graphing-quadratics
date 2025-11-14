// Copyright 2018-2025, University of Colorado Boulder

/**
 * QuadraticSlider is a vertical slider that has a quadratic taper.
 * This slider is used for the 'a' coefficient in the Explore screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQSlider, { GQSliderOptions } from './GQSlider.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import globalKeyStateTracker from '../../../../scenery/js/accessibility/globalKeyStateTracker.js';

type SelfOptions = {
  quadraticKeyboardStep: number; // keyboard step for the quadratic value
  quadraticShiftKeyboardStep: number; // Shift keyboard step for the quadratic value
};

type QuadraticSliderOptions = SelfOptions & StrictOmit<GQSliderOptions, 'map' | 'inverseMap'>;

export default class QuadraticSlider extends GQSlider {

  /**
   * @param symbolStringProperty - the coefficient's symbol
   * @param coefficientProperty - the coefficient's value
   * @param providedOptions
   */
  public constructor( symbolStringProperty: TReadOnlyProperty<string>,
                      coefficientProperty: NumberProperty,
                      providedOptions: QuadraticSliderOptions ) {

    affirm( Math.abs( coefficientProperty.range.min ) === coefficientProperty.range.max,
      `symmetrical range is required: ${coefficientProperty.range}` );

    affirm( !providedOptions.sliderOptions.keyboardStep, 'use quadraticKeyboardStep instead of sliderOptions.keyboardStep' );
    affirm( !providedOptions.sliderOptions.shiftKeyboardStep, 'use quadraticShiftKeyboardStep instead of sliderOptions.shiftKeyboardStep' );
    affirm( !providedOptions.sliderOptions.mapPropertyValue, 'QuadraticSlider sets sliderOptions.mapPropertyValue' );

    // coefficient for quadratic equation y = ax^2
    const a = 1 / coefficientProperty.range.max;

    const options = optionize<QuadraticSliderOptions, SelfOptions, GQSliderOptions>()( {

      // map coefficientProperty.value to slider value, x = sqrt( y / a )
      map: value => ( Math.sign( value ) * Math.sqrt( Math.abs( value ) / a ) ),

      // map slider value to coefficientProperty.value, y = ax^2
      inverseMap: value => ( Math.sign( value ) * a * value * value )
    }, providedOptions );

    // Because this is implemented as a linear slider that maps to a quadratic value, setting keyboardStep and
    // shiftKeyboard step will not provide the desired behavior.  So as a last resort, we use mapPropertyValue to apply
    // the correct delta to the previous value, based on whether the Shift key was down.
    // See https://github.com/phetsims/graphing-quadratics/issues/245.
    options.sliderOptions = combineOptions<QuadraticSliderOptions[ 'sliderOptions']>( {
      mapPropertyValue: ( newSliderValue, previousSliderValue ) => {
        const previousCoefficient = options.inverseMap( previousSliderValue );
        const coefficientStep = ( globalKeyStateTracker.shiftKeyDown ) ? options.quadraticShiftKeyboardStep : options.quadraticKeyboardStep;
        const sign = ( newSliderValue > previousSliderValue ) ? 1 : -1;
        return options.map( previousCoefficient + sign * coefficientStep );
      }
    }, options.sliderOptions );

    super( symbolStringProperty, coefficientProperty, options );
  }
}

graphingQuadratics.register( 'QuadraticSlider', QuadraticSlider );