// Copyright 2018, University of Colorado Boulder

/**
 * Vertex form equation with coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormInteractiveEquationNode extends Node {

    /**
     * @param {NumberProperty} aProperty - a coefficient of vertex form of the quadratic equation
     * @param {NumberProperty} hProperty - h coefficient of vertex form of the quadratic equation
     * @param {NumberProperty} kProperty - k coefficient of vertex form of the quadratic equation
     * @param {Object} [options]
     */
    constructor( aProperty, hProperty, kProperty, options ) {

      assert && assert( aProperty.range, 'missing aProperty.range' );
      assert && assert( hProperty.range, 'missing hProperty.range' );
      assert && assert( kProperty.range, 'missing kProperty.range' );

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // Coefficient pickers
      const numberPickerOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ),
        xMargin: 5,
        touchAreaXDilation: GQConstants.PICKER_TOUCH_AREA_X_DILATION
      };
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_A,
          tandem: options.tandem.createTandem( 'aNumberPicker' ),
          phetioDocumentation: 'picker for coefficient a'
        }, numberPickerOptions ) );
      const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_H,
          tandem: options.tandem.createTandem( 'hNumberPicker' ),
          phetioDocumentation: 'picker for coefficient h'
        }, numberPickerOptions ) );
      const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_K,
          tandem: options.tandem.createTandem( 'kNumberPicker' ),
          phetioDocumentation: 'picker for coefficient k'
        }, numberPickerOptions ) );

      // static parts of the equation
      const richTextOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE )
      };
      const xyOptions = _.extend( {}, richTextOptions, {
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
        aNumberPicker,
        openParenthesisText,
        xText,
        minusText,
        hNumberPicker,
        parenSquaredText,
        plusText,
        kNumberPicker
      ];

      super( options );

      // layout
      const operatorSpacing = 10; // space around operators
      const termSpacing = 6; // space inside terms
      equalToText.left = yText.right + operatorSpacing;
      aNumberPicker.left = equalToText.right + operatorSpacing;
      openParenthesisText.left = aNumberPicker.right + termSpacing;
      xText.left = openParenthesisText.right + termSpacing;
      minusText.left = xText.right + operatorSpacing;
      hNumberPicker.left = minusText.right + operatorSpacing;
      parenSquaredText.left = hNumberPicker.right + termSpacing;
      plusText.left = parenSquaredText.right + operatorSpacing;
      kNumberPicker.left = plusText.right + operatorSpacing;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      hNumberPicker.centerY = equalToText.centerY;
      kNumberPicker.centerY = equalToText.centerY;
    }
  }

  return graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );
} );
