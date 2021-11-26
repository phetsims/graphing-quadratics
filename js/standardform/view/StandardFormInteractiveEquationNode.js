// Copyright 2018-2021, University of Colorado Boulder

/**
 * Standard form equation, y = ax^2 + bx + c, with integer coefficients that can be changed via pickers.
 *
 * @author Andrea Lin
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import NumberPicker from '../../../../scenery-phet/js/NumberPicker.js';
import { Node } from '../../../../scenery/js/imports.js';
import { RichText } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class StandardFormInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the standard form: y = ax^2 + bx + c
   * @param {NumberProperty} aProperty
   * @param {NumberProperty} bProperty
   * @param {NumberProperty} cProperty
   * @param {Object} [options]
   */
  constructor( aProperty, bProperty, cProperty, options ) {

    assert && assert( aProperty.range, 'missing aProperty.range' );
    assert && assert( bProperty.range, 'missing bProperty.range' );
    assert && assert( cProperty.range, 'missing cProperty.range' );

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // coefficient pickers
    const aPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
      merge( {
        color: GQColors.STANDARD_FORM_A,
        tandem: options.tandem.createTandem( 'aPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'a' } )
      }, GQConstants.NUMBER_PICKER_OPTIONS ) );
    const bPicker = new NumberPicker( bProperty, new Property( bProperty.range ),
      merge( {
        color: GQColors.STANDARD_FORM_B,
        tandem: options.tandem.createTandem( 'bPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'b' } )
      }, GQConstants.NUMBER_PICKER_OPTIONS ) );
    const cPicker = new NumberPicker( cProperty, new Property( cProperty.range ),
      merge( {
        color: GQColors.STANDARD_FORM_C,
        tandem: options.tandem.createTandem( 'cPicker' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PICKER_DOC, { symbol: 'c' } )
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
    const xSquaredText = new RichText( GQSymbols.xSquared, xyOptions );
    const plusText = new RichText( MathSymbols.PLUS, richTextOptions );
    const xText = new RichText( GQSymbols.x, xyOptions );
    const secondPlusText = new RichText( MathSymbols.PLUS, richTextOptions );

    assert && assert( !options.children, 'StandardFormInteractiveEquationNode sets children' );
    options.children = [
      yText, equalToText, aPicker, xSquaredText, plusText, bPicker, xText, secondPlusText, cPicker
    ];

    super( options );

    // layout
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
  }
}

graphingQuadratics.register( 'StandardFormInteractiveEquationNode', StandardFormInteractiveEquationNode );
export default StandardFormInteractiveEquationNode;