// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for vertex form equation with coefficients that can be changed.
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
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  // const Util = require( 'DOT/Util' );

  // constants
  const NUMBER_PICKER_OPTIONS = {
    font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ),
    xMargin: 5
  };
  const TEXT_OPTIONS = {
    font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE )
  };

  class VertexFormInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} aRange
     * @param {RangeWithValue} hRange
     * @param {RangeWithValue} kRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, aRange, hRange, kRange, options ) {

      options = options || {};

      // Properties for the variables in vertex form
      const aProperty = new NumberProperty( aRange.defaultValue, { range: aRange, reentrant: true } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange } );

      // a picker
       const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
         _.extend( {}, NUMBER_PICKER_OPTIONS, { color: GQColors.A_SYMBOL } ) );

      // h picker
      const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
        _.extend( {}, NUMBER_PICKER_OPTIONS, { color: GQColors.VERTEX } ) );

      // k picker
      const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
        _.extend( {}, NUMBER_PICKER_OPTIONS, { color: GQColors.VERTEX } ) );

      // static parts of the equation
      const yText = new RichText( GQSymbols.y, TEXT_OPTIONS );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
      const openParenthesisText = new RichText( '(', TEXT_OPTIONS );
      const xText = new RichText( GQSymbols.x, TEXT_OPTIONS );
      const minusText = new RichText( MathSymbols.MINUS, TEXT_OPTIONS );
      const closeParenthesisAndSquaredText = new RichText( ')', TEXT_OPTIONS );
      const exponentText = new RichText( '<sup>2</sup>', TEXT_OPTIONS );
      const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

      assert && assert( !options.children, 'VertexFormInteractiveEquationNode sets children' );
      options.children = [
        yText,
        equalToText,
        aNumberPicker,
        openParenthesisText,
        xText,
        minusText,
        hNumberPicker,
        closeParenthesisAndSquaredText,
        exponentText,
        plusText,
        kNumberPicker
      ];

      super( options );

      // equation layout, spacing determined empirically
      equalToText.left = yText.right + 10;
      aNumberPicker.left = equalToText.right + 10;
      openParenthesisText.left = aNumberPicker.right + 5;
      xText.left = openParenthesisText.right + 5;
      minusText.left = xText.right + 10;
      hNumberPicker.left = minusText.right + 10;
      closeParenthesisAndSquaredText.left = hNumberPicker.right + 5;
      exponentText.left = closeParenthesisAndSquaredText.right + 5;
      plusText.left = exponentText.right + 10;
      kNumberPicker.left = plusText.right + 10;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      hNumberPicker.centerY = equalToText.centerY;
      kNumberPicker.centerY = equalToText.centerY;

      // When the quadratic changes, update the coefficients.
      quadraticProperty.link( quadratic => {
        if ( quadratic.a !== aProperty.value ) {
          aProperty.value = quadratic.a;
        }
        if ( quadratic.vertex && ( quadratic.vertex.x !== hProperty.value ) ) {
          hProperty.value = quadratic.vertex.x;
        }
        if ( quadratic.vertex && ( quadratic.vertex.y !== kProperty.value ) ) {
          kProperty.value = quadratic.vertex.y;
        }
      } );

      // When the coefficients change, update the quadratic.
      Property.multilink( [ aProperty, hProperty, kProperty ], ( a, h, k ) => {
        const newQuadratic = Quadratic.createFromVertexForm( a, h, k, { color: quadraticProperty.value.color } );
        if ( !newQuadratic.equals( quadraticProperty.value ) ) {
          quadraticProperty.value = newQuadratic;
        }
      } );
    }
  }

  return graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );
} );