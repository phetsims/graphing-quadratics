// Copyright 2018, University of Colorado Boulder

/**
 * Vertex form equation, y = ax^2 + bx + c, with integer coefficients that can be changed via pickers.
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
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormInteractiveEquationNode extends Node {

    /**
     * Constructor parameters are coefficients of the vertex form: y = ax^2 + bx + c
     * @param {NumberProperty} aProperty
     * @param {NumberProperty} hProperty
     * @param {NumberProperty} kProperty
     * @param {Object} [options]
     */
    constructor( aProperty, hProperty, kProperty, options ) {

      assert && assert( aProperty.range, 'missing aProperty.range' );
      assert && assert( hProperty.range, 'missing hProperty.range' );
      assert && assert( kProperty.range, 'missing kProperty.range' );

      options = _.extend( {

        // phet-io
        tandem: Tandem.required
      }, options );

      // Coefficient pickers
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_A,
          tandem: options.tandem.createTandem( 'aNumberPicker' ),
          phetioDocumentation: 'picker for coefficient a',
          phetioComponentOptions: { pickableProperty: { phetioFeatured: true } }
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );
      const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_H,
          tandem: options.tandem.createTandem( 'hNumberPicker' ),
          phetioDocumentation: 'picker for coefficient h',
          phetioComponentOptions: { pickableProperty: { phetioFeatured: true } }
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );
      const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
        _.extend( {
          color: GQColors.VERTEX_FORM_K,
          tandem: options.tandem.createTandem( 'kNumberPicker' ),
          phetioDocumentation: 'picker for coefficient k',
          phetioComponentOptions: { pickableProperty: { phetioFeatured: true } }
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );

      // static parts of the equation
      const richTextOptions = {
        font: GQConstants.INTERACTIVE_EQUATION_FONT
      };
      const xyOptions = _.extend( {}, richTextOptions, {
        maxWidth: 30 // determined empirically
      } );
      const yText = new RichText( GQSymbols.y, xyOptions );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
      const openParenthesisText = new RichText( '(', richTextOptions );
      const xText = new RichText( GQSymbols.x, xyOptions );
      const minusText = new RichText( MathSymbols.MINUS, richTextOptions );
      const parenSquaredText = new RichText( ')<sup>2</sup>', richTextOptions );
      const plusText = new RichText( MathSymbols.PLUS, richTextOptions );

      assert && assert( !options.children, 'VertexFormInteractiveEquationNode sets children' );
      options.children = [
        yText,
        equalToText,
        aNumberPicker,
        openParenthesisText,
        xText,
        minusText,
        hNumberPicker,
        parenSquaredText,
        plusText,
        kNumberPicker
      ];

      super( options );

      // layout
      equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      aNumberPicker.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      openParenthesisText.left = aNumberPicker.right + GQConstants.EQUATION_TERM_SPACING;
      xText.left = openParenthesisText.right + GQConstants.EQUATION_TERM_SPACING;
      minusText.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      hNumberPicker.left = minusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      parenSquaredText.left = hNumberPicker.right + GQConstants.EQUATION_TERM_SPACING;
      plusText.left = parenSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      kNumberPicker.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      hNumberPicker.centerY = equalToText.centerY;
      kNumberPicker.centerY = equalToText.centerY;
    }
  }

  return graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );
} );
