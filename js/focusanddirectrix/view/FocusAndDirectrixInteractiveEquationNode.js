// Copyright 2018, University of Colorado Boulder

/**
 * Alternate vertex form equation, y = (1/(4p))(x - h)^2 + k, with coefficients that can be changed via sliders.
 * All sliders have a linear taper.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/CoefficientSlider' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixInteractiveEquationNode extends Node {

    /**
     * Constructor parmeters are coefficients of the alternate vertex form: y = (1/(4p))(x - h)^2 + k
     * @param {NumberProperty} pProperty
     * @param {NumberProperty} hProperty
     * @param {NumberProperty} kProperty
     * @param {Object} [options]
     */
    constructor( pProperty, hProperty, kProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // equation
      const equationNode = new EquationNode( pProperty, hProperty, kProperty, {
        tandem: options.tandem.createTandem( 'equationNode' ),
        phetioDocumentation: 'the equation that changes as you adjust the sliders'
      } );

      // coefficient controls (labeled sliders)
      const pSlider = new CoefficientSlider( GQSymbols.p, pProperty, {

        // p=0 is not supported by this sim because it results in division by zero,
        // see https://github.com/phetsims/graphing-quadratics/issues/31
        skipZero: true,
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_P,
        tandem: options.tandem.createTandem( 'pSlider' ),
        phetioDocumentation: 'slider for coefficient p'
      } );
      const hSlider = new CoefficientSlider( GQSymbols.h, hProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_H,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_H,
        tandem: options.tandem.createTandem( 'hSlider' ),
        phetioDocumentation: 'slider for coefficient h'
      } );
      const kSlider = new CoefficientSlider( GQSymbols.k, kProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_K,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_K,
        tandem: options.tandem.createTandem( 'kSlider' ),
        phetioDocumentation: 'slider for coefficient k'
      } );

      assert && assert( !options.children, 'FocusAndDirectrixInteractiveEquationNode sets children' );
      options.children = [ equationNode, pSlider, hSlider, kSlider ];

      super( options );

      // horizontally align sliders under their associated values in the equation
      const ySpacing = 3;
      pSlider.x = this.globalToLocalBounds( equationNode.pGlobalBounds ).centerX;
      pSlider.top = equationNode.bottom + ySpacing;
      hSlider.x = this.globalToLocalBounds( equationNode.hGlobalBounds ).centerX;
      hSlider.top = equationNode.bottom + ySpacing;
      kSlider.x = this.globalToLocalBounds( equationNode.kGlobalBounds ).centerX;
      kSlider.top = equationNode.bottom + ySpacing;
    }
  }

  graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode', FocusAndDirectrixInteractiveEquationNode );

  /**
   * The equation that appears above the sliders.
   */
  class EquationNode extends Node {

    /**
     * @param {NumberProperty} pProperty
     * @param {NumberProperty} hProperty
     * @param {NumberProperty} kProperty
     * @param {Object} [options]
     */
    constructor( pProperty, hProperty, kProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( pProperty.range, 'missing pProperty.range' );
      assert && assert( hProperty.range, 'missing hProperty.range' );
      assert && assert( kProperty.range, 'missing kProperty.range' );

      // common options for NumberDisplay instances
      const numberDisplayOptions = {
        font: new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } ),
        backgroundFill: null,
        backgroundStroke: null,
        backgroundLineWidth: 0,
        xMargin: 0,
        yMargin: 0
      };

      // options for other parts of the equation
      const equationOptions = {
        font: new PhetFont( GQConstants.INTERACTIVE_EQUATION_FONT_SIZE ),
        fill: 'black'
      };
      const xyOptions = _.extend( {}, equationOptions, {
        maxWidth: 20 // determined empirically
      } );

      // y
      const yNode = new RichText( GQSymbols.y, xyOptions );

      // =
      const equalsNode = new RichText( MathSymbols.EQUAL_TO, equationOptions );

      // 1
      const numeratorNode = new RichText( '1', equationOptions );

      // 4(
      const fourParenNode = new RichText( '4(', equationOptions );

      // p value
      const pNode = new NumberDisplay( pProperty, pProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_P,
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_P
      } ) );

      // )
      const parenNode = new RichText( ')', equationOptions );

      // 1/4(p)
      const denominatorNode = new HBox( {
        children: [ fourParenNode, pNode, parenNode ]
      } );

      // horizontal line between numerator and denominator
      const fractionLineLength = 1.1 * Math.max( numeratorNode.width, denominatorNode.width );
      const fractionLine = new Line( 0, 0, fractionLineLength, 0, {
        stroke: 'black',
        lineWidth: 1
      } );

      // 1/4p
      const fractionNode = new VBox( {
        spacing: 2,
        children: [ numeratorNode, fractionLine, denominatorNode ],
        scale: 0.85
      } );

      // (
      const anotherParenNode = new RichText( '(', equationOptions );

      // x
      const xNode = new RichText( GQSymbols.x, xyOptions );

      // -
      const minusNode = new RichText( MathSymbols.MINUS, equationOptions );

      // h value
      const hNode = new NumberDisplay( hProperty, hProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_H,
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H
      } ) );

      // )^2
      const parenSquaredNode = new RichText( ')<sup>2</sup>', equationOptions );

      // +
      const plusNode = new RichText( MathSymbols.PLUS, equationOptions );

      // k value
      const kNode = new NumberDisplay( kProperty, kProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_K,
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K
      } ) );

      // layout
      equalsNode.left = yNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      fractionNode.left = equalsNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      fractionNode.centerY = equalsNode.centerY;
      anotherParenNode.left = fractionNode.right + GQConstants.EQUATION_TERM_SPACING;
      xNode.left = anotherParenNode.right + GQConstants.EQUATION_TERM_SPACING;
      minusNode.left = xNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      hNode.left = minusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      parenSquaredNode.left = hNode.right + GQConstants.EQUATION_TERM_SPACING;
      plusNode.left = parenSquaredNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      kNode.left = plusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      hNode.bottom = equalsNode.bottom;
      kNode.bottom = equalsNode.bottom;

      // y = (1/(4p))(x - h)^2 + k
      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [ yNode, equalsNode, fractionNode,
        anotherParenNode, xNode, minusNode, hNode, parenSquaredNode, plusNode, kNode ];

      super( options );

      // @private needed by methods
      this.pNode = pNode;
      this.hNode = hNode;
      this.kNode = kNode;
    }

    // @public Gets the global {Bounds2} of p, h, k, used for layout
    get pGlobalBounds() { return this.getGlobalBoundsForNode( this.pNode ); }

    get hGlobalBounds() { return this.getGlobalBoundsForNode( this.hNode ); }

    get kGlobalBounds() { return this.getGlobalBoundsForNode( this.kNode ); }

    // @private gets the global bounds of a descendent Node
    getGlobalBoundsForNode( node ) { return node.localToGlobalBounds( node.localBounds ); }
  }

  graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode.EquationNode', EquationNode );

  return FocusAndDirectrixInteractiveEquationNode;
} );
