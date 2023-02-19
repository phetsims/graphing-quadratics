// Copyright 2018-2022, University of Colorado Boulder

/**
 * GQCheckbox is the base class for a checkbox that is labeled with text, with an optional icon to the right of the text.
 * This also provides consistent font and textNode.maxWidth for all checkboxes in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Node, RichText, TColor } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';

type SelfOptions = {
  textFill?: TColor;
  textMaxWidth?: number;
  font?: PhetFont;
  icon?: Node | null; // optional icon, to the right of text
};

export type GQCheckboxOptions = SelfOptions &
  PickOptional<CheckboxOptions, 'phetioDocumentation'> &
  PickRequired<CheckboxOptions, 'tandem'>;

export default class GQCheckbox extends Checkbox {

  protected constructor( booleanProperty: Property<boolean>, text: string, providedOptions: GQCheckboxOptions ) {

    const options = optionize<GQCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // SelfOptions
      textFill: 'black',
      textMaxWidth: 180, // determined empirically
      font: GQConstants.CHECKBOX_LABEL_FONT,
      icon: null
    }, providedOptions );

    const textNode = new RichText( text, {
      fill: options.textFill,
      font: options.font,
      maxWidth: options.textMaxWidth
    } );

    let content;
    if ( options.icon ) {
      content = new HBox( {
        align: 'center',
        spacing: 8,
        children: [ textNode, options.icon ]
      } );
    }
    else {
      content = textNode;
    }

    super( booleanProperty, content, options );
  }
}

graphingQuadratics.register( 'GQCheckbox', GQCheckbox );