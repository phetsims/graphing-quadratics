// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
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

  // constants
  const TEXT_OPTIONS = { font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ) };
  const NUMBER_PICKER_OPTIONS = {
    font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ),
    color: GQColors.INTERACTIVE_CURVE,
    xMargin: 5
  };

  class IntegersInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} aRange
     * @param {RangeWithValue} bRange
     * @param {RangeWithValue} cRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, aRange, bRange, cRange, options ) {

      options = options || {};

      // coefficient Properties
      const aProperty = new NumberProperty( aRange.defaultValue, { range: aRange, reentrant: true } );
      const bProperty = new NumberProperty( bRange.defaultValue, { range: bRange } );
      const cProperty = new NumberProperty( cRange.defaultValue, { range: cRange } );

      // coefficient pickers
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ), NUMBER_PICKER_OPTIONS );
      const bNumberPicker = new NumberPicker( bProperty, new Property( bProperty.range ), NUMBER_PICKER_OPTIONS );
      const cNumberPicker = new NumberPicker( cProperty, new Property( cProperty.range ), NUMBER_PICKER_OPTIONS );

      // static parts of the equation
      const yText = new RichText( GQSymbols.y, TEXT_OPTIONS );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
      const xSquaredText = new RichText( GQSymbols.xSquared, TEXT_OPTIONS );
      const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
      const xText = new RichText( GQSymbols.x, TEXT_OPTIONS );
      const secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

      assert && assert( !options.children, 'IntegersInteractiveEquationNode sets children' );
      options.children = [
        yText, equalToText, aNumberPicker, xSquaredText, plusText, bNumberPicker, xText, secondPlusText, cNumberPicker
      ];

      super ( options );

      // equation layout, spacing determined empirically
      equalToText.left = yText.right + 10;
      aNumberPicker.left = equalToText.right + 10;
      xSquaredText.left = aNumberPicker.right + 10;
      plusText.left = xSquaredText.right + 10;
      bNumberPicker.left = plusText.right + 10;
      xText.left = bNumberPicker.right + 10;
      secondPlusText.left = xText.right + 10;
      cNumberPicker.left = secondPlusText.right + 10;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      bNumberPicker.centerY = equalToText.centerY;
      cNumberPicker.centerY = equalToText.centerY;

      // When the quadratic changes, update the coefficients.
      quadraticProperty.link( quadratic => {
        if ( quadratic.a !== aProperty.value ) {
          aProperty.value = quadratic.a;
        }
        if ( quadratic.b !== bProperty.value ) {
          bProperty.value = quadratic.b;
        }
        if ( quadratic.c !== cProperty.value ) {
          cProperty.value = quadratic.c;
        }
      } );

      // When the coefficients change, update the quadratic.
      Property.multilink( [ aProperty, bProperty, cProperty ], ( a, b, c ) => {
        quadraticProperty.value = new Quadratic( a, b, c, { color: quadraticProperty.value.color } );
      } );
    }
  }

  return graphingQuadratics.register( 'IntegersInteractiveEquationNode', IntegersInteractiveEquationNode );
} );
