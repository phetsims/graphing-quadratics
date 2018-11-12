// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for the constant term, y = c
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

  class ConstantTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} constantTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( constantTermVisibleProperty, options ) {

      options = _.extend( {
        textFill: GQColors.CONSTANT_TERM,

        // phet-io
        phetioDocumentation: 'checkbox that makes the constant term (y = c) visible on the graph'
      }, options );

      // y = c
      const text = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + GQSymbols.c;

      super( text, constantTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'ConstantTermCheckbox', ConstantTermCheckbox );
} );