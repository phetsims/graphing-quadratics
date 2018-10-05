// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the quadratic term, y = ax^2
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

  class QuadraticTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticTermVisibleProperty, options ) {

      options = _.extend( {
        textFill: GQColors.QUADRATIC_TERM,
        tandem: Tandem.required
      }, options );

      const text = StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        a: GQSymbols.a,
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared
      } );

      super( text, quadraticTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'QuadraticTermCheckbox', QuadraticTermCheckbox );
} );