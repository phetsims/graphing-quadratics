// Copyright 2018-2022, University of Colorado Boulder

/**
 * Checkbox for the constant term, y = c
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

export default class ConstantTermCheckbox extends GQCheckbox {

  public constructor( constantTermVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // y = c
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.c}`;

    super( constantTermVisibleProperty, text, {
      textFill: GQColors.CONSTANT_TERM,
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the constant term (y = c) visible on the graph'
    } );
  }
}

graphingQuadratics.register( 'ConstantTermCheckbox', ConstantTermCheckbox );