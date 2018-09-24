// Copyright 2018, University of Colorado Boulder

//TODO structure this like FocusAndDirectrixInteractiveEquationNode, with EquationNode inner class
/**
 * Renderer for standard form equation with integer coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( require => {
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
  const QuadraticCoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/QuadraticCoefficientSlider' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  class ExploreInteractiveEquationNode extends Node {

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

      // dynamic parts of the equation (coefficients)
      const numberDisplayOptions = {
        font: new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } ),
        backgroundFill: null,
        backgroundStroke: null,
        backgroundLineWidth: 0,
        xMargin: 0,
        yMargin: 0
      };
      const aDisplay = new NumberDisplay( aProperty, aProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_A,
        decimalPlaces: 2
      } ) );
      const bDisplay = new NumberDisplay( bProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_B,
        decimalPlaces: 1
      } ) );
      const cDisplay = new NumberDisplay( cProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_C,
        decimalPlaces: 1
      } ) );

      // static parts of the equation
      const richTextOptions = { font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ) };
      const yText = new RichText( GQSymbols.y, richTextOptions );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
      const xSquaredText = new RichText( GQSymbols.xSquared, richTextOptions );
      const plusText = new RichText( MathSymbols.PLUS, richTextOptions );
      const xText = new RichText( GQSymbols.x, richTextOptions );
      const secondPlusText = new RichText( MathSymbols.PLUS, richTextOptions );

      // coefficient sliders
      const aSlider = new QuadraticCoefficientSlider( GQSymbols.a, aProperty, {
        interval: GQConstants.EXPLORE_SLIDER_INTERVAL_A,
        labelColor: GQColors.EXPLORE_A
      } );
      const bSlider = new CoefficientSlider( GQSymbols.b, bProperty, {
        interval: GQConstants.EXPLORE_SLIDER_INTERVAL_B,
        labelColor: GQColors.EXPLORE_B
      } );
      const cSlider = new CoefficientSlider( GQSymbols.c, cProperty, {
        interval: GQConstants.EXPLORE_SLIDER_INTERVAL_C,
        labelColor: GQColors.EXPLORE_C
      } );

      assert && assert( !options.children, 'ExploreInteractiveEquationNode sets children' );
      options.children = [
        yText, equalToText, aDisplay, xSquaredText, plusText, bDisplay, xText, secondPlusText, cDisplay,
        aSlider, bSlider, cSlider
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

      //TODO sliders are not quite centered under values
      // sliders below equation
      const ySpacing = 5;
      aSlider.centerX = aDisplay.centerX;
      bSlider.centerX = bDisplay.centerX;
      cSlider.centerX = cDisplay.centerX;
      aSlider.top = aDisplay.bottom + ySpacing;
      bSlider.top = bDisplay.bottom + ySpacing;
      cSlider.top = cDisplay.bottom + ySpacing;

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

  return graphingQuadratics.register( 'ExploreInteractiveEquationNode', ExploreInteractiveEquationNode );
} );
