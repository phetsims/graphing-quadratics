// Copyright 2018-2019, University of Colorado Boulder

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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const merge = require( 'PHET_CORE/merge' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

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

  return graphingQuadratics.register( 'GQCheckbox', GQCheckbox );
} );