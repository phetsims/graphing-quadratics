// Copyright 2018, University of Colorado Boulder

/**
 * Vertex form equation with coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers.
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
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} aRange
     * @param {RangeWithValue} hRange
     * @param {RangeWithValue} kRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, aRange, hRange, kRange, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      //TODO instrument a, h, k Properties?
      // Properties for the variables in vertex form
      const aProperty = new NumberProperty( aRange.defaultValue, { range: aRange, reentrant: true } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange } );

      //TODO #14 instrument pickers so they can be disabled
      // Coefficient pickers
      const numberPickerOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ),
        xMargin: 5,
        touchAreaXDilation: GQConstants.PICKER_TOUCH_AREA_X_DILATION
      };
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
        _.extend( {}, numberPickerOptions, { color: GQColors.VERTEX_FORM_A } ) );
      const hNumberPicker = new NumberPicker( hProperty, new Property( hProperty.range ),
        _.extend( {}, numberPickerOptions, { color: GQColors.VERTEX_FORM_H } ) );
      const kNumberPicker = new NumberPicker( kProperty, new Property( kProperty.range ),
        _.extend( {}, numberPickerOptions, { color: GQColors.VERTEX_FORM_K } ) );

      // static parts of the equation
      const richTextOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE )
      };
      const yText = new RichText( GQSymbols.y, richTextOptions );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
      const openParenthesisText = new RichText( '(', richTextOptions );
      const xText = new RichText( GQSymbols.x, richTextOptions );
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

      // equation layout, spacing determined empirically
      const spacing = 10;
      const pickerSpacing = 6; // space to right of picker
      equalToText.left = yText.right + spacing;
      aNumberPicker.left = equalToText.right + spacing;
      openParenthesisText.left = aNumberPicker.right + pickerSpacing;
      xText.left = openParenthesisText.right + pickerSpacing;
      minusText.left = xText.right + spacing;
      hNumberPicker.left = minusText.right + spacing;
      parenSquaredText.left = hNumberPicker.right + pickerSpacing;
      plusText.left = parenSquaredText.right + spacing;
      kNumberPicker.left = plusText.right + spacing;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      hNumberPicker.centerY = equalToText.centerY;
      kNumberPicker.centerY = equalToText.centerY;

      // When the quadratic changes, update the coefficients.
      quadraticProperty.link( quadratic => {
        if ( quadratic.a !== aProperty.value ) {
          aProperty.value = quadratic.a;
        }
        if ( quadratic.vertex && ( quadratic.vertex.x !== hProperty.value ) ) {
          hProperty.value = quadratic.vertex.x;
        }
        if ( quadratic.vertex && ( quadratic.vertex.y !== kProperty.value ) ) {
          kProperty.value = quadratic.vertex.y;
        }
      } );

      // When the coefficients change, update the quadratic.
      Property.multilink( [ aProperty, hProperty, kProperty ], ( a, h, k ) => {
        const newQuadratic = Quadratic.createFromVertexForm( a, h, k, { color: quadraticProperty.value.color } );
        if ( !newQuadratic.equals( quadraticProperty.value ) ) {
          quadraticProperty.value = newQuadratic;
        }
      } );
    }
  }

  return graphingQuadratics.register( 'VertexFormInteractiveEquationNode', VertexFormInteractiveEquationNode );
} );
