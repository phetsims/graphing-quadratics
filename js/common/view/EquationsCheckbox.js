// Copyright 2018, University of Colorado Boulder

/**
 * 'Equations' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const equationsString = require( 'string!GRAPHING_QUADRATICS/equations' );

  class EquationsCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( equationsVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new Text( equationsString, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) ,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      super( content, equationsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'EquationsCheckbox', EquationsCheckbox );
} );