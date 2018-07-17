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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} bProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} cProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function IntegersInteractiveEquationNode( aProperty, bProperty, cProperty, options ) {

    // interactive components of the equation
    var aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ), { color: 'red' } );
    var bNumberPicker = new NumberPicker( bProperty, new Property( bProperty.range ), { color: 'red' } );
    var cNumberPicker = new NumberPicker( cProperty, new Property( cProperty.range ), { color: 'red' } );

    var yText = new RichText( yString, TEXT_OPTIONS );
    var equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
    var xSquaredText = new RichText( xSquaredString, TEXT_OPTIONS );
    var plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
    var xText = new RichText( xString, TEXT_OPTIONS );
    var secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

    Node.call( this, {
      children: [
        yText,
        equalToText,
        aNumberPicker,
        xSquaredText,
        plusText,
        bNumberPicker,
        xText,
        secondPlusText,
        cNumberPicker
      ]
    } );

    // alignment
    equalToText.left = yText.right + 10;
    aNumberPicker.left = equalToText.right + 10;
    xSquaredText.left = aNumberPicker.right + 10;
    plusText.left = xSquaredText.right + 10;
    bNumberPicker.left = plusText.right + 10;
    xText.left = bNumberPicker.right + 10;
    secondPlusText.left = xText.right + 10;
    cNumberPicker.left = secondPlusText.right + 10;
    equalToText.bottom = yText.bottom;
    xSquaredText.bottom = yText.bottom;
    plusText.bottom = yText.bottom;
    xText.bottom = yText.bottom;
    secondPlusText.bottom = yText.bottom;
    aNumberPicker.centerY = xText.centerY;
    bNumberPicker.centerY = xText.centerY;
    cNumberPicker.centerY = xText.centerY;

  }

  graphingQuadratics.register( 'IntegersInteractiveEquationNode', IntegersInteractiveEquationNode );

  return inherit( HBox, IntegersInteractiveEquationNode );
} );
