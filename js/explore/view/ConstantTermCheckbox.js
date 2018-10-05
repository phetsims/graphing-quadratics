// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the constant term, y = c
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class ConstantTermCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} constantTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( constantTermVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        c: GQSymbols.c
      } ), {
        font: new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE ),
        fill: GQColors.CONSTANT_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      super( content, constantTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'ConstantTermCheckbox', ConstantTermCheckbox );
} );