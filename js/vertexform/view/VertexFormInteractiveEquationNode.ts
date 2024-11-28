// Copyright 2018-2024, University of Colorado Boulder

/**
 * Vertex form equation, y = ax^2 + bx + c, with integer coefficients that can be changed via pickers.
 *
 * @author Andrea Lin
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { Node, NodeOptions, RichText, RichTextOptions } from '../../../../scenery/js/imports.js';
import NumberPicker, { NumberPickerOptions } from '../../../../sun/js/NumberPicker.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class VertexFormInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the vertex form: y = ax^2 + bx + c
   */
  public constructor( aProperty: NumberProperty, hProperty: NumberProperty, kProperty: NumberProperty, tandem: Tandem ) {

    const options: NodeOptions = {
      excludeInvisibleChildrenFromBounds: true,
      tandem: tandem,
      phetioDocumentation: 'the interactive equation in this accordion box'
    };

    // value pickers
    const aPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.vertexFormAColorProperty,
        tandem: tandem.createTandem( 'aPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'a' } )
      } ) );
    const hPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.vertexFormHColorProperty,
        tandem: tandem.createTandem( 'hPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'h' } )
      } ) );
    const kPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.vertexFormKColorProperty,
        tandem: tandem.createTandem( 'kPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'k' } )
      } ) );

    // static parts of the equation
    const richTextOptions: RichTextOptions = {
      font: GQConstants.INTERACTIVE_EQUATION_FONT
    };
    const xyOptions = combineOptions<RichTextOptions>( {}, richTextOptions, {
      maxWidth: 30 // determined empirically
    } );
    const yText = new RichText( GQSymbols.yMarkupStringProperty, xyOptions );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
    const openParenthesisText = new RichText( '(', richTextOptions );
    const xText = new RichText( GQSymbols.xMarkupStringProperty, xyOptions );
    const minusText = new RichText( MathSymbols.MINUS, richTextOptions );
    const parenSquaredText = new RichText( ')<sup>2</sup>', richTextOptions );
    const plusText = new RichText( MathSymbols.PLUS, richTextOptions );

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

    // If any of the components that include dynamic text change their size, redo the layout.
    Multilink.multilink( [
      yText.boundsProperty, xText.boundsProperty,
      aPicker.boundsProperty, hPicker.boundsProperty, kPicker.boundsProperty
    ], () => {

      // equation layout
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
    } );
  }
}

graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );