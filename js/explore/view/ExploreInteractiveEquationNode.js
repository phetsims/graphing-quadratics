// Copyright 2018, University of Colorado Boulder

/**
 * Standard form equation, y = ax^2 + bx + c, with coefficients that can be changed via sliders.
 * The slider for coefficient 'a' has a quadratic taper (since it's modifying a quadratic term), while
 * the other sliders are linear.
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
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const QuadraticCoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/QuadraticCoefficientSlider' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );

  class ExploreInteractiveEquationNode extends Node {

    /**
     * Constructor parameters are coefficients of the standard form: y = ax^2 + bx + c
     * @param {NumberProperty} aProperty
     * @param {NumberProperty} bProperty
     * @param {NumberProperty} cProperty
     * @param {Object} [options]
     */
    constructor( aProperty, bProperty, cProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // equation
      const equationNode = new EquationNode( aProperty, bProperty, cProperty, {
        tandem: options.tandem.createTandem( 'equationNode' ),
        phetioDocumentation: 'the equation that changes as the sliders are adjusted'
      } );

      // coefficient controls (labeled sliders)
      const aSlider = new QuadraticCoefficientSlider( GQSymbols.a, aProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_A,
        labelColor: GQColors.EXPLORE_A,
        tandem: options.tandem.createTandem( 'aSlider' ),
        phetioDocumentation: 'slider for coefficient a'
      } );
      const bSlider = new CoefficientSlider( GQSymbols.b, bProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_B,
        labelColor: GQColors.EXPLORE_B,
        tandem: options.tandem.createTandem( 'bSlider' ),
        phetioDocumentation: 'slider for coefficient b'
      } );
      const cSlider = new CoefficientSlider( GQSymbols.c, cProperty, {
        interval: GQConstants.EXPLORE_INTERVAL_C,
        labelColor: GQColors.EXPLORE_C,
        tandem: options.tandem.createTandem( 'cSlider' ),
        phetioDocumentation: 'slider for constant c'
      } );

      assert && assert( !options.children, 'ExploreInteractiveEquationNode sets children' );
      options.children = [ equationNode, aSlider, bSlider, cSlider ];

      super( options );

      // horizontally align sliders under their associated values in the equation
      const ySpacing = 3;
      aSlider.x = this.globalToLocalBounds( equationNode.aGlobalBounds ).centerX;
      aSlider.top = equationNode.bottom + ySpacing;
      bSlider.x = this.globalToLocalBounds( equationNode.bGlobalBounds ).centerX;
      bSlider.top = equationNode.bottom + ySpacing;
      cSlider.x = this.globalToLocalBounds( equationNode.cGlobalBounds ).centerX;
      cSlider.top = equationNode.bottom + ySpacing;
    }
  }

  graphingQuadratics.register( 'ExploreInteractiveEquationNode', ExploreInteractiveEquationNode );

  /**
   * The equation that appears above the sliders.
   */
  class EquationNode extends Node {

    /**
     * @param {NumberProperty} aProperty
     * @param {NumberProperty} bProperty
     * @param {NumberProperty} cProperty
     * @param {Object} [options]
     */
    constructor( aProperty, bProperty, cProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( aProperty.range, 'missing aProperty.range' );
      assert && assert( bProperty.range, 'missing bProperty.range' );
      assert && assert( cProperty.range, 'missing cProperty.range' );

      // options for parts of the equation
      const equationOptions = {
        font: GQConstants.INTERACTIVE_EQUATION_FONT
      };
      const xyOptions = _.extend( {}, equationOptions, {
        maxWidth: 20 // determined empirically
      } );

      // y
      const yNode = new RichText( GQSymbols.y, xyOptions );

      // =
      const equalsNode = new RichText( MathSymbols.EQUAL_TO, equationOptions );

      // a value
      const aNode = new NumberDisplay( aProperty, aProperty.range,
        _.extend( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
          numberFill: GQColors.EXPLORE_A,
          decimalPlaces: GQConstants.EXPLORE_DECIMALS_A
        } ) );

      // x^2
      const xSquaredNode = new RichText( GQSymbols.xSquared, xyOptions );

      // + 
      const plusNode = new RichText( MathSymbols.PLUS, equationOptions );

      // b value
      const bNode = new NumberDisplay( bProperty, bProperty.range,
        _.extend( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
          numberFill: GQColors.EXPLORE_B,
          decimalPlaces: GQConstants.EXPLORE_DECIMALS_B
        } ) );

      // x
      const xNode = new RichText( GQSymbols.x, xyOptions );

      // +
      const anotherPlusNode = new RichText( MathSymbols.PLUS, equationOptions );

      // c value
      const cNode = new NumberDisplay( cProperty, bProperty.range,
        _.extend( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
          numberFill: GQColors.EXPLORE_C,
          decimalPlaces: GQConstants.EXPLORE_DECIMALS_C
        } ) );

      // y = ax^2 + bx + c
      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [
        yNode, equalsNode, aNode, xSquaredNode, plusNode,
        xNode, bNode, anotherPlusNode, cNode
      ];

      // layout
      equalsNode.left = yNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      aNode.left = equalsNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xSquaredNode.left = aNode.right + GQConstants.EQUATION_TERM_SPACING;
      plusNode.left = xSquaredNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      bNode.left = plusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      xNode.left = bNode.right + GQConstants.EQUATION_TERM_SPACING;
      anotherPlusNode.left = xNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      cNode.left = anotherPlusNode.right + GQConstants.EQUATION_OPERATOR_SPACING;
      aNode.bottom = equalsNode.bottom;
      bNode.bottom = equalsNode.bottom;
      cNode.bottom = equalsNode.bottom;

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
