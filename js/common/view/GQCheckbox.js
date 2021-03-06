// Copyright 2018-2020, University of Colorado Boulder

/**
 * A checkbox that is labeled with text, with an optional icon to the right of the text.
 * This also provides consistent font and textNode.maxWidth for all checkboxes in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';

class GQCheckbox extends Checkbox {

  /**
   * @param {string} text - supports RichText
   * @param {BooleanProperty} booleanProperty
   * @param {Object} [options]
   */
  constructor( text, booleanProperty, options ) {

    options = merge( {
      textFill: 'black',
      font: GQConstants.CHECKBOX_LABEL_FONT,
      icon: null, // {Node|null} optional icon, to the right of text

      // phet-io
      tandem: Tandem.REQUIRED

    }, options );

    const textNode = new RichText( text, {
      fill: options.textFill,
      font: options.font,
      maxWidth: 180 // determined empirically
    } );

    let content = null;
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

    super( content, booleanProperty, options );
  }
}

graphingQuadratics.register( 'GQCheckbox', GQCheckbox );
export default GQCheckbox;