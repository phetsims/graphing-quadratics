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
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );

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
   * @param {Property.<Quadratic|undefined>} quadraticProperty
   * @param {Object} [options]
   * @constructor
   */
  function VertexInteractiveEquationNode( quadraticProperty, options ) {

    const aProperty = new NumberProperty( 0, { range: { min: -6, max: 6 } } ) ;
    const hProperty = new NumberProperty( 0, { range: { min: -10, max: 10 } } ) ;
    const kProperty = new NumberProperty( 0, { range: { min: -10, max: 10 } } ) ;

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
    const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ), NUMBER_PICKER_OPTIONS );
    const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ), NUMBER_PICKER_OPTIONS );
    const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ), NUMBER_PICKER_OPTIONS );

    const yText = new RichText( yString, TEXT_OPTIONS );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
    const openParenthesisText = new RichText( '(', TEXT_OPTIONS );
    const xText = new RichText( xString, TEXT_OPTIONS );
    const minusText = new RichText( MathSymbols.MINUS, TEXT_OPTIONS );
    const closeParenthesisAndSquaredText = new RichText( ')<sup>2</sup>', TEXT_OPTIONS );
    const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

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
