// Copyright 2018-2019, University of Colorado Boulder

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
  const merge = require( 'PHET_CORE/merge' );

  class QuadraticTermCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticTermVisibleProperty, options ) {

      options = merge( {
        textFill: GQColors.QUADRATIC_TERM,

        // phet-io
        phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible on the graph'
      }, options );

      // y = ax^2
      const text = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + GQSymbols.a + GQSymbols.xSquared;

      super( text, quadraticTermVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'QuadraticTermCheckbox', QuadraticTermCheckbox );
} );