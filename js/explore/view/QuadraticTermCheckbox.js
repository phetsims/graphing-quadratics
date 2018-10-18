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

  class QuadraticTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticTermVisibleProperty, options ) {

      options = _.extend( {
        textFill: GQColors.QUADRATIC_TERM,
        phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible the graph'
      }, options );

      // y = ax^2
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