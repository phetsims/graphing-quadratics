// Copyright 2018-2024, University of Colorado Boulder

/**
 * Static equation in standard form: y = ax^2 + bx + c
 * This is sometimes referred to as general form, typically in the context of conics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class StandardFormEquationNode extends Node {

  public constructor() {

    // y = ax^2 + bx + c
    const stringProperty = new DerivedProperty( [
      GQSymbols.yMarkupStringProperty,
      GQSymbols.aMarkupStringProperty,
      GQSymbols.xSquaredMarkupStringProperty,
      GQSymbols.bMarkupStringProperty,
      GQSymbols.xMarkupStringProperty,
      GQSymbols.cMarkupStringProperty
    ], ( y, a, x2, b, x, c ) =>
      `${y} ${MathSymbols.EQUAL_TO} ${a}${x2} ${MathSymbols.PLUS} ${b}${x} ${MathSymbols.PLUS} ${c}` );

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

graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );