// Copyright 2018, University of Colorado Boulder

/**
 * Standard form equation, y = ax^2 + bx + c, with integer coefficients that can be changed via pickers.
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
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormInteractiveEquationNode extends Node {

    /**
     * Constructor parameters are coefficients of the standard form: y = ax^2 + bx + c
     * @param {NumberProperty} aProperty
     * @param {NumberProperty} bProperty
     * @param {NumberProperty} cProperty
     * @param {Object} [options]
     */
    constructor( aProperty, bProperty, cProperty, options ) {

      assert && assert( aProperty.range, 'missing aProperty.range' );
      assert && assert( bProperty.range, 'missing bProperty.range' );
      assert && assert( cProperty.range, 'missing cProperty.range' );

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // coefficient pickers
      const aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ),
        _.extend( {
          color: GQColors.STANDARD_FORM_A,
          tandem: options.tandem.createTandem( 'aNumberPicker' ),
          phetioDocumentation: 'picker for coefficient a'
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );
      const bNumberPicker = new NumberPicker( bProperty, new Property( bProperty.range ),
        _.extend( {
          color: GQColors.STANDARD_FORM_B,
          tandem: options.tandem.createTandem( 'bNumberPicker' ),
          phetioDocumentation: 'picker for coefficient b'
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );
      const cNumberPicker = new NumberPicker( cProperty, new Property( cProperty.range ),
        _.extend( {
          color: GQColors.STANDARD_FORM_C,
          tandem: options.tandem.createTandem( 'cNumberPicker' ),
          phetioDocumentation: 'picker for constant c'
        }, GQConstants.NUMBER_PICKER_OPTIONS ) );

      // static parts of the equation
      const richTextOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE )
      };
      const xyOptions = _.extend( {}, richTextOptions, {
        maxWidth: 30 // determined empirically
      } );
      const yText = new RichText( GQSymbols.y, xyOptions );
      const equalToText = new RichText( MathSymbols.EQUAL_TO, richTextOptions );
      const xSquaredText = new RichText( GQSymbols.xSquared, xyOptions );
      const plusText = new RichText( MathSymbols.PLUS, richTextOptions );
      const xText = new RichText( GQSymbols.x, xyOptions );
      const secondPlusText = new RichText( MathSymbols.PLUS, richTextOptions );

      assert && assert( !options.children, 'StandardFormInteractiveEquationNode sets children' );
      options.children = [
        yText, equalToText, aNumberPicker, xSquaredText, plusText, bNumberPicker, xText, secondPlusText, cNumberPicker
      ];

      super( options );

      // layout
      equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      aNumberPicker.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xSquaredText.left = aNumberPicker.right + GQConstants.EQUATION_TERM_SPACING;
      plusText.left = xSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      bNumberPicker.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xText.left = bNumberPicker.right + GQConstants.EQUATION_TERM_SPACING;
      secondPlusText.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
      cNumberPicker.left = secondPlusText.right + GQConstants.EQUATION_OPERATOR_SPACING;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      bNumberPicker.centerY = equalToText.centerY;
      cNumberPicker.centerY = equalToText.centerY;
    }
  }

  return graphingQuadratics.register( 'StandardFormInteractiveEquationNode', StandardFormInteractiveEquationNode );
} );
