// Copyright 2018, University of Colorado Boulder

/**
 * A checkbox that is labeled with text, with an optional icon to the right of the text.
 * This also provides consistent font and textNode.maxWidth for all checkboxes in the sim.
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

  class GQCheckbox extends Checkbox {

    /**
     * @param {string} text - supports RichText
     * @param {BooleanProperty} booleanProperty
     * @param {Object} [options]
     */
    constructor( text, booleanProperty, options ) {

      options = _.extend( {
        textFill: 'black',
        icon: null, // {Node|null} optional icon, to the right of text
        tandem: Tandem.required
      }, options );

      const textNode = new RichText( text, {
        fill: options.textFill,
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      let content = null;
      if ( options.icon ) {
        content = new HBox( {
          align: 'center',
          spacing: GQConstants.CHECKBOX_ICON_SPACING,
          children: [ textNode, options.icon ]
        } );
      }
      else {
        content = textNode;
      }

      super( content, booleanProperty, options );
    }
  }

  return graphingQuadratics.register( 'GQCheckbox', GQCheckbox );
} );