// Copyright 2018, University of Colorado Boulder

/**
 * Standard form equation with integer coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
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
     * @param {NumberProperty} aProperty - a coefficient of the standard form of the quadratic equation
     * @param {NumberProperty} bProperty - b coefficient of the standard form of the quadratic equation
     * @param {NumberProperty} cProperty - c constant of the standard form of the quadratic equation
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
      const operatorSpacing = 10; // space around operators
      const termSpacing = 6; // space inside terms
      equalToText.left = yText.right + operatorSpacing;
      aNumberPicker.left = equalToText.right + operatorSpacing;
      xSquaredText.left = aNumberPicker.right + termSpacing;
      plusText.left = xSquaredText.right + operatorSpacing;
      bNumberPicker.left = plusText.right + operatorSpacing;
      xText.left = bNumberPicker.right + termSpacing;
      secondPlusText.left = xText.right + operatorSpacing;
      cNumberPicker.left = secondPlusText.right + operatorSpacing;

      // vertically center pickers on equals
      aNumberPicker.centerY = equalToText.centerY;
      bNumberPicker.centerY = equalToText.centerY;
      cNumberPicker.centerY = equalToText.centerY;
    }
  }

  return graphingQuadratics.register( 'StandardFormInteractiveEquationNode', StandardFormInteractiveEquationNode );
} );
