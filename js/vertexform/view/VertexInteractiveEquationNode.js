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
  const Node = require( 'SCENERY/nodes/Node' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  var NUMBER_PICKER_OPTIONS = {
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
    var openParenthesesText = new RichText( '(', TEXT_OPTIONS );
    var xText = new RichText( xString, TEXT_OPTIONS );
    var minusText = new RichText( MathSymbols.MINUS, TEXT_OPTIONS );
    var closeParentheseAndSquaredText = new RichText( ')<sup>2</sup>', TEXT_OPTIONS );
    var plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

    Node.call( this, {
      children: [
        yText,
        equalToText,
        aNumberPicker,
        openParenthesesText,
        xText,
        minusText,
        hNumberPicker,
        closeParentheseAndSquaredText,
        plusText,
        kNumberPicker
      ]
    } );

    // alignment
    equalToText.left = yText.right + 10;
    aNumberPicker.left = equalToText.right + 10;
    openParenthesesText.left = aNumberPicker.right + 10;
    xText.left = openParenthesesText.right + 10;
    minusText.left = xText.right + 10;
    hNumberPicker.left = minusText.right + 10;
    closeParentheseAndSquaredText.left = hNumberPicker.right + 10;
    plusText.left = closeParentheseAndSquaredText.right + 10;
    kNumberPicker.left = plusText.right + 10;
    equalToText.bottom = yText.bottom;
    openParenthesesText.bottom = yText.bottom;
    xText.bottom = yText.bottom;
    minusText.bottom = yText.bottom;
    closeParentheseAndSquaredText.bottom = yText.bottom;
    plusText.bottom = yText.bottom;
    aNumberPicker.centerY = xText.centerY;
    hNumberPicker.centerY = xText.centerY;
    kNumberPicker.centerY = xText.centerY;
  }

  graphingQuadratics.register( 'VertexInteractiveEquationNode', VertexInteractiveEquationNode );

  return inherit( Node, VertexInteractiveEquationNode );
} );
