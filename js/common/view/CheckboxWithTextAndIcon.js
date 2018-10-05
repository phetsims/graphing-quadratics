// Copyright 2018, University of Colorado Boulder

/**
 * A checkbox that is labeled with text and an icon to the right of the text.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

  class CheckboxWithTextAndIcon extends Checkbox {

    /**
     * @param {string} text - supports RichText
     * @param {Node} icon
     * @param {BooleanProperty} booleanProperty
     * @param {Object} [options]
     */
    constructor( text, icon, booleanProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const textNode = new RichText( text, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      const content = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [ textNode, icon ]
      } );

      super( content, booleanProperty, options );
    }
  }

  return graphingQuadratics.register( 'CheckboxWithTextAndIcon', CheckboxWithTextAndIcon );
} );