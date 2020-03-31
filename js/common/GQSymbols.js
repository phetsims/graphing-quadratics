// Copyright 2018-2020, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';
import graphingQuadratics from '../graphingQuadratics.js';

const aString = graphingQuadraticsStrings.a;
const bString = graphingQuadraticsStrings.b;
const cString = graphingQuadraticsStrings.c;
const hString = graphingQuadraticsStrings.h;
const kString = graphingQuadraticsStrings.k;
const pString = graphingQuadraticsStrings.p;
const xString = graphingQuadraticsStrings.x;
const yString = graphingQuadraticsStrings.y;

// constants
const SYMBOL_PATTERN = '<i style=\'font-family: ' + new MathSymbolFont( 10 ).family + '\'>{{symbol}}</i>';
const x = StringUtils.fillIn( SYMBOL_PATTERN, { symbol: xString } );

const GQSymbols = {
  a: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: aString } ),
  b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: bString } ),
  c: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: cString } ),
  h: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: hString } ),
  k: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: kString } ),
  p: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: pString } ),
  x: x,
  xSquared: StringUtils.fillIn( '{{x}}<sup>2</sup>', { x: x } ),
  y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: yString } )
};

graphingQuadratics.register( 'GQSymbols', GQSymbols );
export default GQSymbols;