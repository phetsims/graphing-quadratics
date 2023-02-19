// Copyright 2018-2022, University of Colorado Boulder

/**
 * Checkbox for the linear term, y = bx
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

export default class LinearTermCheckbox extends GQCheckbox {

  public constructor( linearTermVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // y = bx
    const text = `${GQSymbols.y} ${MathSymbols.EQUAL_TO} ${GQSymbols.b}${GQSymbols.x}`;

    super( linearTermVisibleProperty, text, {
      textFill: GQColors.LINEAR_TERM,
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible on the graph'
    } );
  }
}

graphingQuadratics.register( 'LinearTermCheckbox', LinearTermCheckbox );