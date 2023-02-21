// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Static equation in the form: y = (1/(4p)(x - h)^2 + k
 * This is an alternative version of the vertex form, when 1/(4p) is substituted for a.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Line, Node, RichText, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class FocusAndDirectrixEquationNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      font: GQConstants.INTERACTIVE_EQUATION_FONT,
      fractionFont: GQConstants.INTERACTIVE_EQUATION_FRACTION_FONT,
      color: 'black',

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // y =
    const yEqualsString = `${GQSymbols.y} ${MathSymbols.EQUAL_TO}`;
    const yEqualsNode = new RichText( yEqualsString, {
      font: options.font,
      fill: options.color
    } );

    // 1
    const numeratorNode = new RichText( '1', {
      font: options.fractionFont,
      fill: options.color
    } );

    // 4p
    const denominatorString = `4${GQSymbols.p}`;
    const denominatorNode = new RichText( denominatorString, {
      font: options.fractionFont,
      fill: options.color
    } );

    // horizontal line between numerator and denominator
    const fractionLineLength = 1.25 * Math.max( numeratorNode.width, denominatorNode.width );
    const fractionLine = new Line( 0, 0, fractionLineLength, 0, {
      stroke: options.color,
      lineWidth: 1
    } );

    // 1/4p
    const fractionNode = new VBox( {
      spacing: 2,
      align: 'center',
      children: [ numeratorNode, fractionLine, denominatorNode ]
    } );

    // (x - h)^2 + k
    const rightString = StringUtils.fillIn( '({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
      x: GQSymbols.x,
      h: GQSymbols.h,
      k: GQSymbols.k,
      plus: MathSymbols.PLUS,
      minus: MathSymbols.MINUS
    } );
    const rightNode = new RichText( rightString, {
      font: options.font,
      fill: options.color
    } );

    assert && assert( !options.children, 'FocusAndDirectrixEquationNode sets children' );
    options.children = [ yEqualsNode, fractionNode, rightNode ];

    const xSpacing = 5;
    fractionNode.left = yEqualsNode.right + xSpacing;
    fractionNode.centerY = yEqualsNode.centerY;
    rightNode.left = fractionNode.right + xSpacing;

    super( options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixEquationNode', FocusAndDirectrixEquationNode );