// Copyright 2018, University of Colorado Boulder

/**
 * Alternate vertex form equation with coefficients that can be changed via sliders.
 * Form is y = (1/(4p))(x - h)^2 + k, where p, h, and k can be changed with number pickers
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
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixInteractiveEquationNode extends Node {

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

      // equation
      const equationNode = new EquationNode( pProperty, hProperty, kProperty, {
        tandem: options.tandem.createTandem( 'equationNode' )
      } );

      // sliders
      const pSlider = new CoefficientSlider( GQSymbols.p, pProperty, {

        // p=0 is not supported by this sim, see https://github.com/phetsims/graphing-quadratics/issues/31
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
      pSlider.centerX = this.globalToLocalBounds( equationNode.pGlobalBounds ).centerX;
      pSlider.top = equationNode.bottom + ySpacing;
      hSlider.centerX = this.globalToLocalBounds( equationNode.hGlobalBounds ).centerX;
      hSlider.top = equationNode.bottom + ySpacing;
      kSlider.centerX = this.globalToLocalBounds( equationNode.kGlobalBounds ).centerX;
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

      // y =
      const yEqualsNode = new RichText( StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } ), equationOptions );

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
      const fractionLineLength = 1.25 * Math.max( numeratorNode.width, denominatorNode.width );
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

      // (x -
      const xMinusNode = new RichText( StringUtils.fillIn( '({{x}} {{minus}}', {
        x: GQSymbols.x,
        minus: MathSymbols.MINUS
      } ), equationOptions );

      // h value
      const hNode = new NumberDisplay( hProperty, hProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_H,
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H
      } ) );

      // )^2 +
      const squaredPlusNode = new RichText( StringUtils.fillIn( ')<sup>2</sup> {{plus}}', {
        plus: MathSymbols.PLUS
      } ), equationOptions );

      // k value
      const kNode = new NumberDisplay( kProperty, kProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_K,
        decimalPlaces: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K
      } ) );

      // layout
      const xSpacing = 5;
      fractionNode.left = yEqualsNode.right + xSpacing;
      fractionNode.centerY = yEqualsNode.centerY;
      xMinusNode.left = fractionNode.right + xSpacing;
      hNode.left = xMinusNode.right + xSpacing;
      hNode.centerY = yEqualsNode.centerY;
      squaredPlusNode.left = hNode.right + xSpacing;
      kNode.left = squaredPlusNode.right + xSpacing;
      kNode.centerY = yEqualsNode.centerY;

      // y = (1/(4p))(x - h)^2 + k
      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [ yEqualsNode, fractionNode, xMinusNode, hNode, squaredPlusNode, kNode ];

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
