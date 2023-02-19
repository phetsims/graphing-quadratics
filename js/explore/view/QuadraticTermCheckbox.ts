// Copyright 2018-2022, University of Colorado Boulder

/**
 * Checkbox for the quadratic term, y = ax^2
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQSymbols from '../../common/GQSymbols.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class QuadraticTermCheckbox extends GQCheckbox {

  public constructor( quadraticTermVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // y = ax^2
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.a}${GQSymbols.xSquared}`;

    super( quadraticTermVisibleProperty, text, {
      textFill: GQColors.QUADRATIC_TERM,
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible on the graph'
    } );
  }
}

graphingQuadratics.register( 'QuadraticTermCheckbox', QuadraticTermCheckbox );