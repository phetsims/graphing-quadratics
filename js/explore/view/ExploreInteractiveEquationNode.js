// Copyright 2018, University of Colorado Boulder

/**
 * Standard form equation with integer coefficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with sliders.
 *
 * @author Andrea Lin
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
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const QuadraticCoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/QuadraticCoefficientSlider' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class ExploreInteractiveEquationNode extends Node {

    /**
     * @param {NumberProperty} aProperty - a coefficient of the standard form of the quadratic equation
     * @param {NumberProperty} bProperty - b coefficient of the standard form of the quadratic equation
     * @param {NumberProperty} cProperty - c constant of the standard form of the quadratic equation
     * @param {Object} [options]
     */
    constructor( aProperty, bProperty, cProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // equation
      const equationNode = new EquationNode( aProperty, bProperty, cProperty, {
        tandem: options.tandem.createTandem( 'equationNode' )
      } );

      // coefficient sliders
      const aSlider = new QuadraticCoefficientSlider( GQSymbols.a, aProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_A,
        labelColor: GQColors.EXPLORE_A,
        tandem: options.tandem.createTandem( 'aSlider' ),
        phetioInstanceDocumentation: 'slider for coefficient a'
      } );
      const bSlider = new CoefficientSlider( GQSymbols.b, bProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_B,
        labelColor: GQColors.EXPLORE_B,
        tandem: options.tandem.createTandem( 'bSlider' ),
        phetioInstanceDocumentation: 'slider for coefficient b'
      } );
      const cSlider = new CoefficientSlider( GQSymbols.c, cProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_C,
        labelColor: GQColors.EXPLORE_C,
        tandem: options.tandem.createTandem( 'cSlider' ),
        phetioInstanceDocumentation: 'slider for constant c'
      } );

      assert && assert( !options.children, 'ExploreInteractiveEquationNode sets children' );
      options.children = [ equationNode, aSlider, bSlider, cSlider ];

      super( options );

      // horizontally align sliders under their associated values in the equation
      const ySpacing = 3;
      aSlider.centerX = this.globalToLocalBounds( equationNode.aGlobalBounds ).centerX;
      aSlider.top = equationNode.bottom + ySpacing;
      bSlider.centerX = this.globalToLocalBounds( equationNode.bGlobalBounds ).centerX;
      bSlider.top = equationNode.bottom + ySpacing;
      cSlider.centerX = this.globalToLocalBounds( equationNode.cGlobalBounds ).centerX;
      cSlider.top = equationNode.bottom + ySpacing;
    }
  }

  graphingQuadratics.register( 'ExploreInteractiveEquationNode', ExploreInteractiveEquationNode );

  /**
   * The equation that appears above the sliders.
   */
  class EquationNode extends HBox {

    /**
     * @param {NumberProperty} aProperty
     * @param {NumberProperty} bProperty
     * @param {NumberProperty} cProperty
     * @param {Object} [options]
     */
    constructor( aProperty, bProperty, cProperty, options ) {

      options = _.extend( {

        // HBox options
        align: 'bottom',
        spacing: 5,
        maxWidth: 300, // determined empirically
        tandem: Tandem.required
      }, options );

      assert && assert( aProperty.range, 'missing aProperty.range' );
      assert && assert( bProperty.range, 'missing bProperty.range' );
      assert && assert( cProperty.range, 'missing cProperty.range' );

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

      // a value
      const aNode = new NumberDisplay( aProperty, aProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_A,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_A
      } ) );

      // x
      const xNode = new RichText( GQSymbols.x, xyOptions );

      // x^2 +
      const squaredPlusNode = new RichText( StringUtils.fillIn( '<sup>2</sup> {{plus}}', {
        plus: MathSymbols.PLUS
      } ), equationOptions );

      // b value
      const bNode = new NumberDisplay( bProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_B,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_B
      } ) );

      // x
      const anotherXNode = new RichText( GQSymbols.x, xyOptions );
      
      // +
      const plusNode = new RichText( MathSymbols.PLUS, equationOptions );

      // c value
      const cNode = new NumberDisplay( cProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_C,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_C
      } ) );

      // y = ax^2 + bx + c
      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [ yNode, equalsNode, aNode, xNode, squaredPlusNode, anotherXNode, bNode, plusNode, cNode ];

      super( options );

      // @private needed by methods
      this.aNode = aNode;
      this.bNode = bNode;
      this.cNode = cNode;
    }

    // @public Gets the global {Bounds2} of a, b, c, used for layout
    get aGlobalBounds() { return this.getGlobalBoundsForNode( this.aNode ); }

    get bGlobalBounds() { return this.getGlobalBoundsForNode( this.bNode ); }

    get cGlobalBounds() { return this.getGlobalBoundsForNode( this.cNode ); }

    // @private gets the global bounds of a descendent Node
    getGlobalBoundsForNode( node ) { return node.localToGlobalBounds( node.localBounds ); }
  }

  graphingQuadratics.register( 'ExploreInteractiveEquationNode.EquationNode', EquationNode );

  return ExploreInteractiveEquationNode;
} );
