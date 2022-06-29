// Copyright 2018-2022, University of Colorado Boulder

/**
 * Vertex form equation, y = ax^2 + bx + c, with integer coefficients that can be changed via pickers.
 *
 * @author Andrea Lin
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import NumberPicker from '../../../../sun/js/NumberPicker.js';
import { Node } from '../../../../scenery/js/imports.js';
import { RichText } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class VertexFormInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the vertex form: y = ax^2 + bx + c
   * @param {NumberProperty} aProperty
   * @param {NumberProperty} hProperty
   * @param {NumberProperty} kProperty
   * @param {Object} [options]
   */
  constructor( aProperty, hProperty, kProperty, options ) {

    assert && assert( aProperty.range, 'missing aProperty.range' );
    assert && assert( hProperty.range, 'missing hProperty.range' );
    assert && assert( kProperty.range, 'missing kProperty.range' );

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'accordion box that contains the interactive equation'

    }, options );

    // value pickers
    const aPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
      merge( {
        color: GQColors.VERTEX_FORM_A,
        tandem: options.tandem.createTandem( 'aPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'a' } )
      }, GQConstants.NUMBER_PICKER_OPTIONS ) );
    const hPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
      merge( {
        color: GQColors.VERTEX_FORM_H,
        tandem: options.tandem.createTandem( 'hPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'h' } )
      }, GQConstants.NUMBER_PICKER_OPTIONS ) );
    const kPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
      merge( {
        color: GQColors.VERTEX_FORM_K,
        tandem: options.tandem.createTandem( 'kPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'k' } )
      }, GQConstants.NUMBER_PICKER_OPTIONS ) );

    // static parts of the equation
    const richTextOptions = {
      font: GQConstants.INTERACTIVE_EQUATION_FONT
    };
    const xyOptions = merge( {}, richTextOptions, {
      maxWidth: 30 // determined empirically
    } );
    const yText = new RichText( GQSymbols.y, xyOptions );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
    const openParenthesisText = new RichText( '(', richTextOptions );
    const xText = new RichText( GQSymbols.x, xyOptions );
    const minusText = new RichText( MathSymbols.MINUS, richTextOptions );
    const parenSquaredText = new RichText( ')<sup>2</sup>', richTextOptions );
    const plusText = new RichText( MathSymbols.PLUS, richTextOptions );

    assert && assert( !options.children, 'VertexFormInteractiveEquationNode sets children' );
    options.children = [
      yText,
      equalToText,
      aPicker,
      openParenthesisText,
      xText,
      minusText,
      hPicker,
      parenSquaredText,
      plusText,
      kPicker
    ];

    super( options );

    // layout
    equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
    aPicker.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
    openParenthesisText.left = aPicker.right + GQConstants.EQUATION_TERM_SPACING;
    xText.left = openParenthesisText.right + GQConstants.EQUATION_TERM_SPACING;
    minusText.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
    hPicker.left = minusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
    parenSquaredText.left = hPicker.right + GQConstants.EQUATION_TERM_SPACING;
    plusText.left = parenSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
    kPicker.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;

    // vertically center pickers on equals
    aPicker.centerY = equalToText.centerY;
    hPicker.centerY = equalToText.centerY;
    kPicker.centerY = equalToText.centerY;
  }
}

graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );
export default VertexFormInteractiveEquationNode;