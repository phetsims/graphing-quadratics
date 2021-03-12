// Copyright 2018-2020, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingQuadratics from '../graphingQuadratics.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';

// constants
const SYMBOL_PATTERN = `<i style='font-family: ${new MathSymbolFont( 10 ).family}'>{{symbol}}</i>`;
const x = StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.x } );

const GQSymbols = {
  a: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.a } ),
  b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.b } ),
  c: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.c } ),
  h: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.h } ),
  k: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.k } ),
  p: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.p } ),
  x: x,
  xSquared: StringUtils.fillIn( '{{x}}<sup>2</sup>', { x: x } ),
  y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingQuadraticsStrings.y } )
};

graphingQuadratics.register( 'GQSymbols', GQSymbols );
export default GQSymbols;