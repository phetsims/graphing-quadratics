// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for vertex form equation with coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers.
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
    color: GQColors.VERTEX,
    xMargin: 5
  };

  class VertexInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, options ) {

      options = options || {};

      const aProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } );
      const hProperty = new NumberProperty( 0, { range: { min: -10, max: 10 } } );
      const kProperty = new NumberProperty( 0, { range: { min: -10, max: 10 } } );

      quadraticProperty.link( function( quadratic ) {
        if ( quadratic.a !== aProperty.get() ) {
          aProperty.set( quadratic.a );
        }
        if ( quadratic.vertex && quadratic.vertex.x !== hProperty.get() ) {
          hProperty.set( quadratic.vertex.x );
        }
        if ( quadratic.vertex && quadratic.vertex.y !== kProperty.get() ) {
          kProperty.set( quadratic.vertex.y );
        }
      } );

      Property.multilink( [ aProperty, hProperty, kProperty ], function( a, h, k ) {
        const newQuadratic = Quadratic.createFromVertexForm( a, h, k );
        if ( !newQuadratic.equals( quadraticProperty.get() ) ) {
          quadraticProperty.set( newQuadratic );
        }
      } );

      // interactive components of the equation
      const aNumberPicker = new NumberPicker(
        aProperty,
        new Property( aProperty.range ),
        _.extend( {}, NUMBER_PICKER_OPTIONS, {
          color: GQColors.A_SYMBOL,
          xMargin: 14 // h and k pickers have more digits, so make the a picker a bit wider
        } )
      );
      const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ), NUMBER_PICKER_OPTIONS );
      const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ), NUMBER_PICKER_OPTIONS );

      const yText = new RichText( GQSymbols.y, TEXT_OPTIONS );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
      const openParenthesisText = new RichText( '(', TEXT_OPTIONS );
      const xText = new RichText( GQSymbols.x, TEXT_OPTIONS );
      const minusText = new RichText( MathSymbols.MINUS, TEXT_OPTIONS );
      //TODO separate out subscript
      const closeParenthesisAndSquaredText = new RichText( ')<sup>2</sup>', TEXT_OPTIONS );
      const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

      assert && assert( !options.children, 'VertexInteractiveEquationNode sets children' );
      options.children = [
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
      ];

      super( options );

      // layout
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
  }

  return graphingQuadratics.register( 'VertexInteractiveEquationNode', VertexInteractiveEquationNode );
} );
