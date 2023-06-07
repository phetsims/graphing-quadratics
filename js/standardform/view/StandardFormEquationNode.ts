// Copyright 2018-2023, University of Colorado Boulder

/**
 * Static equation in standard form: y = ax^2 + bx + c
 * This is sometimes referred to as general form, typically in the context of conics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Node, NodeOptions, RichText } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class StandardFormEquationNode extends Node {

  public constructor( tandem: Tandem ) {

    const options: NodeOptions = {
      maxWidth: 225, // determined empirically
      tandem: tandem,
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    };

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

    // Wrap the RichText so that its API is not accessible to clients or PhET-iO.
    options.children = [ textNode ];

    super( options );
  }
}

graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );