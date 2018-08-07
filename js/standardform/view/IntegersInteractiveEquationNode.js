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
     * @param {Object} [options]
     */
    constructor( quadraticProperty, options ) {

      options = options || {};

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

      // layout, spacing determined empirically
      equalToText.left = yText.right + 10;
      aNumberPicker.left = equalToText.right + 10;
      xSquaredText.left = aNumberPicker.right + 10;
      plusText.left = xSquaredText.right + 10;
      bNumberPicker.left = plusText.right + 10;
      xText.left = bNumberPicker.right + 10;
      secondPlusText.left = xText.right + 10;
      cNumberPicker.left = secondPlusText.right + 10;
      aNumberPicker.centerY = equalToText.centerY;
      bNumberPicker.centerY = equalToText.centerY;
      cNumberPicker.centerY = equalToText.centerY;
    }
  }

  return graphingQuadratics.register( 'IntegersInteractiveEquationNode', IntegersInteractiveEquationNode );
} );
