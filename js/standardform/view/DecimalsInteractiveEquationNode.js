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
  const SliderUnit = require( 'GRAPHING_QUADRATICS/common/view/SliderUnit' );

  // constants
  const TEXT_OPTIONS = { font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ) };
  const NUMBER_DISPLAY_OPTIONS = {
    font: new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } ),
    numberFill: GQColors.ACTIVE_CURVE,
    backgroundFill: null,
    backgroundStroke: null,
    decimalPlaces: 1,
    xMargin: 0,
    yMargin: 0
  };

  class DecimalsInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, options ) {

      options = options || {};

      const aProperty = new NumberProperty( 1, { range: { min: -6, max: 6 } } );
      const bProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } );
      const cProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } );

      quadraticProperty.link( function( quadratic ) {
        if ( quadratic.a !== aProperty.get() ) {
          aProperty.set( quadratic.a );
        }
        if ( quadratic.b !== bProperty.get() ) {
          bProperty.set( quadratic.b );
        }
        if ( quadratic.c !== cProperty.get() ) {
          cProperty.set( quadratic.c );
        }
      } );

      Property.multilink( [ aProperty, bProperty, cProperty ], function( a, b, c ) {
        const newQuadratic = new Quadratic( a, b, c );
        if ( !newQuadratic.equals( quadraticProperty.get() ) ) {
          quadraticProperty.set( new Quadratic( a, b, c ) );
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

      const aControl = new SliderUnit( GQSymbols.a, aProperty, 2 );
      const bControl = new SliderUnit( GQSymbols.b, bProperty, 1 );
      const cControl = new SliderUnit( GQSymbols.c, cProperty, 1 );

      assert && assert( !options.children, 'DecimalsInteractiveEquationNode sets children' );
      options.children = [
        yText, equalToText, aDisplay, xSquaredText, plusText, bDisplay, xText, secondPlusText, cDisplay,
        aControl,
        bControl,
        cControl
      ];

      super( options );

      // layout
      equalToText.left = yText.right + 10;
      aDisplay.left = equalToText.right + 10;
      xSquaredText.left = aDisplay.right + 5;
      plusText.left = xSquaredText.right + 10;
      bDisplay.left = plusText.right + 10;
      xText.left = bDisplay.right + 5;
      secondPlusText.left = xText.right + 10;
      cDisplay.left = secondPlusText.right + 10;
      equalToText.bottom = yText.bottom;
      xSquaredText.bottom = yText.bottom;
      plusText.bottom = yText.bottom;
      xText.bottom = yText.bottom;
      secondPlusText.bottom = yText.bottom;
      aDisplay.bottom = yText.bottom;
      bDisplay.bottom = yText.bottom;
      cDisplay.bottom = yText.bottom;
      aControl.centerX = aDisplay.centerX;
      bControl.centerX = bDisplay.centerX;
      cControl.centerX = cDisplay.centerX;
      aControl.top = aDisplay.bottom + 5;
      bControl.top = bDisplay.bottom + 5;
      cControl.top = cDisplay.bottom + 5;
    }
  }

  return graphingQuadratics.register( 'DecimalsInteractiveEquationNode', DecimalsInteractiveEquationNode );
} );
