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
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  const xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  const TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  const NUMBER_PICKER_OPTIONS = {
    font: GQFont.NUMBER_FONT,
    color: GQColors.ACTIVE_CURVE,
    xMargin: 5
  };

  class IntegersInteractiveEquationNode extends Node {

    //TODO option not used
    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, options ) {

      const aProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } );
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

      // interactive components of the equation
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ), NUMBER_PICKER_OPTIONS );
      const bNumberPicker = new NumberPicker( bProperty, new Property( bProperty.range ), NUMBER_PICKER_OPTIONS );
      const cNumberPicker = new NumberPicker( cProperty, new Property( cProperty.range ), NUMBER_PICKER_OPTIONS );

      const yText = new RichText( yString, TEXT_OPTIONS );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
      const xSquaredText = new RichText( xSquaredString, TEXT_OPTIONS );
      const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
      const xText = new RichText( xString, TEXT_OPTIONS );
      const secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

      super ( {
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
  }

  return graphingQuadratics.register( 'IntegersInteractiveEquationNode', IntegersInteractiveEquationNode );
} );
