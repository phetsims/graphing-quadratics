// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Checkbox for the constant term, y = c
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import GQColors from '../../common/GQColors.js';
import GQSymbols from '../../common/GQSymbols.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class ConstantTermCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} constantTermVisibleProperty
   * @param {Object} [options]
   */
  constructor( constantTermVisibleProperty, options ) {

    options = merge( {
      textFill: GQColors.CONSTANT_TERM,

      // phet-io
      phetioDocumentation: 'checkbox that makes the constant term (y = c) visible on the graph'

    }, options );

    // y = c
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.c}`;

    super( constantTermVisibleProperty, text, options );
  }
}

graphingQuadratics.register( 'ConstantTermCheckbox', ConstantTermCheckbox );