// Copyright 2014-2018, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  class GQFont extends PhetFont {

    /**
     * @param {number|*} options font size or font options
     */
    constructor( options ) {

      // convenience for specifying font size only, e.g. new GQFont(24)
      if ( typeof options === 'number' ) {
        options = { size: options };
      }

      // font attributes, as specified in the design document
      options = _.extend( {
        family: 'Tahoma'
      }, options );

      super( options );
    }
  }

  graphingQuadratics.register( 'GQFont', GQFont );

  // @static @public for use in equations
  GQFont.NUMBER_FONT = new GQFont( {
    size: 21,
    weight: 'bold'
  } );

  GQFont.MATH_SYMBOL_FONT = new MathSymbolFont( {
    size: 24,
    weight: 'bold'
  } );

  GQFont.SMALLER_MATH_SYMBOL_FONT = new MathSymbolFont( {
    size: 18,
    weight: 'bold'
  } );

  return GQFont;
} );
