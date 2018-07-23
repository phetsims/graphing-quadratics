// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer cofficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  const TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  const NUMBER_PICKER_OPTIONS = {
    font: GQFont.NUMBER_FONT,
    color: 'red',
    xMargin: 5
  };

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} hProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} kProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function VertexInteractiveEquationNode( aProperty, hProperty, kProperty, options ) {

    // interactive components of the equation
    var aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ), NUMBER_PICKER_OPTIONS );
    var hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ), NUMBER_PICKER_OPTIONS );
    var kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ), NUMBER_PICKER_OPTIONS );

    var yText = new RichText( yString, TEXT_OPTIONS );
    var equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
    var openParenthesisText = new RichText( '(', TEXT_OPTIONS );
    var xText = new RichText( xString, TEXT_OPTIONS );
    var minusText = new RichText( MathSymbols.MINUS, TEXT_OPTIONS );
    var closeParenthesisAndSquaredText = new RichText( ')<sup>2</sup>', TEXT_OPTIONS );
    var plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

    Node.call( this, {
      children: [
        yText,
        equalToText,
        aNumberPicker,
        openParenthesisText,
        xText,
        minusText,
        hNumberPicker,
        closeParenthesisAndSquaredText,
        plusText,
        kNumberPicker
      ]
    } );

    // alignment
    equalToText.left = yText.right + 10;
    aNumberPicker.left = equalToText.right + 10;
    openParenthesisText.left = aNumberPicker.right + 5;
    xText.left = openParenthesisText.right + 5;
    minusText.left = xText.right + 10;
    hNumberPicker.left = minusText.right + 10;
    closeParenthesisAndSquaredText.left = hNumberPicker.right + 5;
    plusText.left = closeParenthesisAndSquaredText.right + 10;
    kNumberPicker.left = plusText.right + 10;
    equalToText.bottom = yText.bottom;
    openParenthesisText.bottom = yText.bottom;
    xText.bottom = yText.bottom;
    minusText.bottom = yText.bottom;
    closeParenthesisAndSquaredText.bottom = yText.bottom;
    plusText.bottom = yText.bottom;
    aNumberPicker.centerY = xText.centerY;
    hNumberPicker.centerY = xText.centerY;
    kNumberPicker.centerY = xText.centerY;
  }

  graphingQuadratics.register( 'VertexInteractiveEquationNode', VertexInteractiveEquationNode );

  return inherit( Node, VertexInteractiveEquationNode );
} );
