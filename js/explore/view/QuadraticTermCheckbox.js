// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the quadratic term, y = ax^2
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

  class QuadraticTermCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticTermVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        a: GQSymbols.a,
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared
      } ), {
        font: new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE ),
        fill: GQColors.QUADRATIC_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );

      super( content, quadraticTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'QuadraticTermCheckbox', QuadraticTermCheckbox );
} );