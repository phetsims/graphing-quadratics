// Copyright 2018-2023, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * We have not instrumented these Properties for PhET-iO, because seeing the markup is not useful for clients.
 * See https://github.com/phetsims/graphing-quadratics/issues/186
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';

const xMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.xStringProperty );

const GQSymbols = {
  aMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.aStringProperty ),
  bMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.bStringProperty ),
  cMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.cStringProperty ),
  hMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.hStringProperty ),
  kMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.kStringProperty ),
  pMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.pStringProperty ),
  xMarkupStringProperty: xMarkupStringProperty,
  xSquaredMarkupStringProperty: new DerivedProperty( [ xMarkupStringProperty ], x => `${x}<sup>2</sup>` ),
  yMarkupStringProperty: MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.yStringProperty )
};

graphingQuadratics.register( 'GQSymbols', GQSymbols );
export default GQSymbols;