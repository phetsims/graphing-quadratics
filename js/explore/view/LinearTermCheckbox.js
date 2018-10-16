// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the linear term, y = bx
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class LinearTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} linearTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( linearTermVisibleProperty, options ) {

      options = _.extend( {
        textFill: GQColors.LINEAR_TERM,
        tandem: Tandem.required
      }, options );

      // y = bx
      const text = StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } );

      super( text, linearTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'LinearTermCheckbox', LinearTermCheckbox );
} );