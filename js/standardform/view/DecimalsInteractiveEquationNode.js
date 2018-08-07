// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const CoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/CoefficientSlider' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  // constants
  const TEXT_OPTIONS = { font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ) };
  const NUMBER_DISPLAY_OPTIONS = {
    font: new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } ),
    numberFill: GQColors.INTERACTIVE_CURVE,
    backgroundFill: null,
    backgroundStroke: null,
    decimalPlaces: 1,
    xMargin: 0,
    yMargin: 0
  };

  class DecimalsInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} aRange
     * @param {RangeWithValue} bRange
     * @param {RangeWithValue} cRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, aRange, bRange, cRange, options ) {

      options = options || {};

      const aProperty = new NumberProperty( aRange.defaultValue, { range: aRange } );
      const bProperty = new NumberProperty( bRange.defaultValue, { range: bRange } );
      const cProperty = new NumberProperty( cRange.defaultValue, { range: cRange } );

      quadraticProperty.link( function( quadratic ) {
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

      Property.multilink( [ aProperty, bProperty, cProperty ], function( a, b, c ) {
        const newQuadratic = new Quadratic( a, b, c );
        if ( !newQuadratic.equals( quadraticProperty.value ) ) {
          quadraticProperty.value = new Quadratic( a, b, c );
        }
      } );

      const aDisplay = new NumberDisplay(
        aProperty,
        aProperty.range,
        _.extend( {}, NUMBER_DISPLAY_OPTIONS, { decimalPlaces: 2 } )
      );
      const bDisplay = new NumberDisplay( bProperty, bProperty.range, NUMBER_DISPLAY_OPTIONS );
      const cDisplay = new NumberDisplay( cProperty, bProperty.range, NUMBER_DISPLAY_OPTIONS );

      const yText = new RichText( GQSymbols.y, TEXT_OPTIONS );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
      const xSquaredText = new RichText( GQSymbols.xSquared, TEXT_OPTIONS );
      const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
      const xText = new RichText( GQSymbols.x, TEXT_OPTIONS );
      const secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

      const aSlider = new CoefficientSlider( GQSymbols.a, aProperty, 2 );
      const bSlider = new CoefficientSlider( GQSymbols.b, bProperty, 1 );
      const cSlider = new CoefficientSlider( GQSymbols.c, cProperty, 1 );

      assert && assert( !options.children, 'DecimalsInteractiveEquationNode sets children' );
      options.children = [
        yText, equalToText, aDisplay, xSquaredText, plusText, bDisplay, xText, secondPlusText, cDisplay,
        aSlider,
        bSlider,
        cSlider
      ];

      super( options );

      // equation layout, spacing determined empirically
      equalToText.left = yText.right + 10;
      aDisplay.left = equalToText.right + 10;
      xSquaredText.left = aDisplay.right + 5;
      plusText.left = xSquaredText.right + 10;
      bDisplay.left = plusText.right + 10;
      xText.left = bDisplay.right + 5;
      secondPlusText.left = xText.right + 10;
      cDisplay.left = secondPlusText.right + 10;
      aDisplay.bottom = yText.bottom;
      bDisplay.bottom = yText.bottom;
      cDisplay.bottom = yText.bottom;
      
      // sliders below equation
      var ySpacing = 5;
      aSlider.centerX = aDisplay.centerX;
      bSlider.centerX = bDisplay.centerX;
      cSlider.centerX = cDisplay.centerX;
      aSlider.top = aDisplay.bottom + ySpacing;
      bSlider.top = bDisplay.bottom + ySpacing;
      cSlider.top = cDisplay.bottom + ySpacing;
    }
  }

  return graphingQuadratics.register( 'DecimalsInteractiveEquationNode', DecimalsInteractiveEquationNode );
} );
