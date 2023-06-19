// Copyright 2018-2023, University of Colorado Boulder

/**
 * Static equation in vertex form: y = a(x - h)^2 + k
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Node, RichText } from '../../../../scenery/js/imports.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class VertexFormEquationNode extends Node {

  public constructor() {

    // y = a(x - h)^2 + k
    const stringProperty = new DerivedProperty( [
      GQSymbols.yMarkupStringProperty,
      GQSymbols.aMarkupStringProperty,
      GQSymbols.xMarkupStringProperty,
      GQSymbols.hMarkupStringProperty,
      GQSymbols.kMarkupStringProperty
    ], ( y, a, x, h, k ) =>
      `${y} ${MathSymbols.EQUAL_TO} ${a}(${x} ${MathSymbols.MINUS} ${h})<sup>2</sup> ${MathSymbols.PLUS} ${k}` );

    const textNode = new RichText( stringProperty, {
      font: GQConstants.INTERACTIVE_EQUATION_FONT,
      fill: 'black'
    } );

    super( {
      maxWidth: 225, // determined empirically
      children: [ textNode ] // Wrap the RichText so that its API is not accessible to clients or PhET-iO.
    } );
  }
}

graphingQuadratics.register( 'VertexFormEquationNode', VertexFormEquationNode );