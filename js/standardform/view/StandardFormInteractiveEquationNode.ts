// Copyright 2018-2025, University of Colorado Boulder

/**
 * StandardFormInteractiveEquationNode displays the interactive equation in standard form, y = ax^2 + bx + c,
 * with integer coefficients that can be changed via pickers.
 *
 * @author Andrea Lin
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import NumberPicker, { NumberPickerOptions } from '../../../../sun/js/NumberPicker.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

export default class StandardFormInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the standard form: y = ax^2 + bx + c
   */
  public constructor( aProperty: NumberProperty,
                      bProperty: NumberProperty,
                      cProperty: NumberProperty,
                      tandem: Tandem ) {

    // y equals {{a}} x squared plus {{b}} x plus {{c}}
    const accessibleParagraphProperty = new PatternStringProperty(
      GraphingQuadraticsStrings.a11y.standardFormEquationNode.accessibleParagraphStringProperty, {
        a: aProperty,
        b: bProperty,
        c: cProperty
      } );

    const options: NodeOptions = {
      isDisposable: false,
      excludeInvisibleChildrenFromBounds: true,
      tandem: tandem,
      phetioDocumentation: 'the interactive equation in this accordion box'
    };

    // coefficient pickers
    const aPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.standardFormAColorProperty,
        accessibleName: GraphingQuadraticsStrings.a11y.aPicker.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.aPicker.accessibleHelpTextStringProperty,
        tandem: tandem.createTandem( 'aPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'a' } )
      } ) );

    const bPicker = new NumberPicker( bProperty, new Property( bProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.standardFormBColorProperty,
        accessibleName: GraphingQuadraticsStrings.a11y.bPicker.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.bPicker.accessibleHelpTextStringProperty,
        tandem: tandem.createTandem( 'bPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'b' } )
      } ) );

    const cPicker = new NumberPicker( cProperty, new Property( cProperty.range ),
      combineOptions<NumberPickerOptions>( {}, GQConstants.NUMBER_PICKER_OPTIONS, {
        color: GQColors.standardFormCColorProperty,
        accessibleName: GraphingQuadraticsStrings.a11y.cPicker.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.cPicker.accessibleHelpTextStringProperty,
        tandem: tandem.createTandem( 'cPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'c' } )
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
    const xSquaredText = new RichText( GQSymbols.xSquaredMarkupStringProperty, xyOptions );
    const plusText = new RichText( MathSymbols.PLUS, richTextOptions );
    const xText = new RichText( GQSymbols.xMarkupStringProperty, xyOptions );
    const secondPlusText = new RichText( MathSymbols.PLUS, richTextOptions );

    options.children = [
      yText, equalToText, aPicker, xSquaredText, plusText, bPicker, xText, secondPlusText, cPicker
    ];

    super( options );

    // Assigned to the leading yText so this paragraph comes before all other children content.
    yText.accessibleParagraph = accessibleParagraphProperty;

    // If any of the components that include dynamic text change their size, redo the layout.
    Multilink.multilink( [
      yText.boundsProperty, xSquaredText.boundsProperty, xText.boundsProperty,
      aPicker.boundsProperty, bPicker.boundsProperty, cPicker.boundsProperty
    ], () => {

      // equation layout
      equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      aPicker.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xSquaredText.left = aPicker.right + GQConstants.EQUATION_TERM_SPACING;
      plusText.left = xSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      bPicker.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xText.left = bPicker.right + GQConstants.EQUATION_TERM_SPACING;
      secondPlusText.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      cPicker.left = secondPlusText.right + GQConstants.EQUATION_OPERATOR_SPACING;

      // vertically center pickers on equals
      aPicker.centerY = equalToText.centerY;
      bPicker.centerY = equalToText.centerY;
      cPicker.centerY = equalToText.centerY;
    } );
  }
}

graphingQuadratics.register( 'StandardFormInteractiveEquationNode', StandardFormInteractiveEquationNode );