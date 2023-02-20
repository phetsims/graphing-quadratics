// Copyright 2018-2022, University of Colorado Boulder

/**
 * Static equation in standard form: y = ax^2 + bx + c
 * This is sometimes referred to as general form, typically in the context of conics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Node, NodeOptions, RichText } from '../../../../scenery/js/imports.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

type SelfOptions = EmptySelfOptions;

type StandardFormEquationNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'phetioDocumentation'>;

export default class StandardFormEquationNode extends Node {

  public constructor( providedOptions: StandardFormEquationNodeOptions ) {

    const options = optionize<StandardFormEquationNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      maxWidth: 225, // determined empirically
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    // y = ax^2 + bx + c
    const text = StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}} {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
      x: GQSymbols.x,
      xSquared: GQSymbols.xSquared,
      y: GQSymbols.y,
      a: GQSymbols.a,
      b: GQSymbols.b,
      c: GQSymbols.c,
      equals: MathSymbols.EQUAL_TO,
      plus: MathSymbols.PLUS
    } );

    const textNode = new RichText( text, {
      font: GQConstants.INTERACTIVE_EQUATION_FONT,
      fill: 'black'
    } );

    // Wrap the RichText so that its API is not accessible to clients or PhET-iO.
    options.children = [ textNode ];

    super( options );
  }
}

graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );