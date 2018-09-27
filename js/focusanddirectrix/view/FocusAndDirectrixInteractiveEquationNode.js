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
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} pRange
     * @param {RangeWithValue} hRange
     * @param {RangeWithValue} kRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, pRange, hRange, kRange, options ) {

      options = options || {};

      // coefficient Properties
      const pProperty = new NumberProperty( pRange.defaultValue, { range: pRange, reentrant: true } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange, reentrant: true } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange, reentrant: true } );

      // equation
      const equationNode = new EquationNode( pProperty, hProperty, kProperty );

      // sliders
      const pSlider = new CoefficientSlider( GQSymbols.p, pProperty, {
        skipZero: true,
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_P
      } );
      const hSlider = new CoefficientSlider( GQSymbols.h, hProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_H,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_H
      } );
      const kSlider = new CoefficientSlider( GQSymbols.k, kProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_K,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_K
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

      //TODO #17 hack to prevent 'call stack size exceeded'
      let changing = false;

      // When the coefficients change, update the quadratic.
      Property.multilink( [ pProperty, hProperty, kProperty ], ( p, h, k ) => {
        if ( !changing ) {
          changing = true;
          quadraticProperty.value = Quadratic.createFromAlternateVertexForm( p, h, k, { color: quadraticProperty.value.color } );
          changing = false;
        }
      } );

      // When the quadratic changes, update the coefficients
      quadraticProperty.link( quadratic => {
        if ( !changing ) {
          changing = true;
          pProperty.value = pRange.constrainValue( quadratic.p );
          hProperty.value = hRange.constrainValue( quadratic.h );
          kProperty.value = kRange.constrainValue( quadratic.k );
          changing = false;
        }
      } );
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
     */
    constructor( pProperty, hProperty, kProperty ) {

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
        decimalPlaces: Util.numberOfDecimalPlaces( GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P )
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
        decimalPlaces: Util.numberOfDecimalPlaces( GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_H )
      } ) );

      // )^2 +
      const squaredPlusNode = new RichText( StringUtils.fillIn( ')<sup>2</sup> {{plus}}', {
        plus: MathSymbols.PLUS
      } ), equationOptions );

      // k value
      const kNode = new NumberDisplay( kProperty, kProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.FOCUS_AND_DIRECTRIX_K,
        decimalPlaces: Util.numberOfDecimalPlaces( GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_K )
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

      super( {

        // y = (1/(4p))(x - h)^2 + k
        children: [ yEqualsNode, fractionNode, xMinusNode, hNode, squaredPlusNode, kNode ]
      } );

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
