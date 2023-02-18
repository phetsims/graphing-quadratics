// Copyright 2018-2022, University of Colorado Boulder

/**
 * Checkbox for the linear term, y = bx
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import GQColors from '../../common/GQColors.js';
import GQSymbols from '../../common/GQSymbols.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class LinearTermCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} linearTermVisibleProperty
   * @param {Object} [options]
   */
  constructor( linearTermVisibleProperty, options ) {

    options = merge( {
      textFill: GQColors.LINEAR_TERM,

      // phet-io
      phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible on the graph'

    }, options );

    // y = bx
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.b}${GQSymbols.x}`;

    super( linearTermVisibleProperty, text, options );
  }
}

graphingQuadratics.register( 'LinearTermCheckbox', LinearTermCheckbox );