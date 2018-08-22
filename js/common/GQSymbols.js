// Copyright 2018, University of Colorado Boulder

/**
 * String for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const bString = require( 'string!GRAPHING_QUADRATICS/b' );
  const cString = require( 'string!GRAPHING_QUADRATICS/c' );
  const hString = require( 'string!GRAPHING_QUADRATICS/h' );
  const kString = require( 'string!GRAPHING_QUADRATICS/k' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  const SYMBOL_PATTERN = '<i style=\'font-family: ' + new MathSymbolFont( 10 ).family + '\'>{{symbol}}</i>';
  const x = StringUtils.fillIn( SYMBOL_PATTERN, { symbol: xString } );

  const GQSymbols = {
    a: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: aString } ),
    b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: bString } ),
    c: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: cString } ),
    h: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: hString } ),
    k: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: kString } ),
    x: x,
    xSquared: StringUtils.fillIn( '{{x}}<sup>2</sup>', { x: x } ),
    y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: yString } )
  };

  return graphingQuadratics.register( 'GQSymbols', GQSymbols );
} );