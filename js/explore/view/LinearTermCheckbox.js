// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the linear term, y = bx
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

  class LinearTermCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} linearTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( linearTermVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } ), {
        font: new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE ),
        fill: GQColors.LINEAR_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      super( content, linearTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'LinearTermCheckbox', LinearTermCheckbox );
} );