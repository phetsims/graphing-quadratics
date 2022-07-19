// Copyright 2018-2021, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingQuadratics from '../graphingQuadratics.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';

const x = MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.x );

const GQSymbols = {
  a: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.a ),
  b: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.b ),
  c: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.c ),
  h: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.h ),
  k: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.k ),
  p: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.p ),
  x: x,
  xSquared: `${x}<sup>2</sup>`,
  y: MathSymbolFont.getRichTextMarkup( graphingQuadraticsStrings.y )
};

graphingQuadratics.register( 'GQSymbols', GQSymbols );
export default GQSymbols;