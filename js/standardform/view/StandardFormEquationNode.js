// Copyright 2018-2021, University of Colorado Boulder

/**
 * Static equation in standard form: y = ax^2 + bx + c
 * This is sometimes referred to as general form, typically in the context of conics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Node, RichText } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class StandardFormEquationNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

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
    assert && assert( !options.children, 'StandardFormEquationNode sets children' );
    options.children = [ textNode ];

    super( options );
  }
}

graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );
export default StandardFormEquationNode;