// Copyright 2018-2025, University of Colorado Boulder

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

export default class GQSymbols {

  private constructor() {
    // Not intended for instantiation.
  }
  
  public static readonly aMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.aStringProperty );
  public static readonly bMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.bStringProperty );
  public static readonly cMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.cStringProperty );
  public static readonly hMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.hStringProperty );
  public static readonly kMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.kStringProperty );
  public static readonly pMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.pStringProperty );
  public static readonly xMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.xStringProperty );
  public static readonly xSquaredMarkupStringProperty = new DerivedProperty( [ GQSymbols.xMarkupStringProperty ], x => `${x}<sup>2</sup>` );
  public static readonly yMarkupStringProperty = MathSymbolFont.createDerivedProperty( GraphingQuadraticsStrings.yStringProperty );
}

graphingQuadratics.register( 'GQSymbols', GQSymbols );