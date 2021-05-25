// Copyright 2018-2021, University of Colorado Boulder

/**
 * Checkbox for the quadratic term, y = ax^2
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import GQColors from '../../common/GQColors.js';
import GQSymbols from '../../common/GQSymbols.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class QuadraticTermCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} quadraticTermVisibleProperty
   * @param {Object} [options]
   */
  constructor( quadraticTermVisibleProperty, options ) {

    options = merge( {
      textFill: GQColors.QUADRATIC_TERM,

      // phet-io
      phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible on the graph'
    }, options );

    // y = ax^2
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.a}${GQSymbols.xSquared}`;

    super( text, quadraticTermVisibleProperty, options );
  }
}

graphingQuadratics.register( 'QuadraticTermCheckbox', QuadraticTermCheckbox );
export default QuadraticTermCheckbox;