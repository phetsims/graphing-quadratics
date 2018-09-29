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
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticCoefficientSlider = require( 'GRAPHING_QUADRATICS/common/view/QuadraticCoefficientSlider' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class ExploreInteractiveEquationNode extends Node {

    /**
     * @param {Property.<Quadratic|undefined>} quadraticProperty
     * @param {RangeWithValue} aRange
     * @param {RangeWithValue} bRange
     * @param {RangeWithValue} cRange
     * @param {Object} [options]
     */
    constructor( quadraticProperty, aRange, bRange, cRange, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      //TODO #14 instrument a, b, c Properties?
      // coefficient Properties
      const aProperty = new NumberProperty( aRange.defaultValue, { range: aRange, reentrant: true } );
      const bProperty = new NumberProperty( bRange.defaultValue, { range: bRange } );
      const cProperty = new NumberProperty( cRange.defaultValue, { range: cRange } );

      // equation
      const equationNode = new EquationNode( aProperty, bProperty, cProperty, {
        tandem: options.tandem.createTandem( 'equationNode' )
      } );

      //TODO #14 instrument sliders
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

      //TODO #17 hack for floating point error
      let changing = false;

      // When the coefficients change, update the quadratic.
      Property.multilink( [ aProperty, bProperty, cProperty ], ( a, b, c ) => {
        if ( !changing ) {
          changing = true;
          quadraticProperty.value = new Quadratic( a, b, c, { color: quadraticProperty.value.color } );
          changing = false;
        }
      } );

      // When the quadratic changes, update the coefficients.
      quadraticProperty.link( quadratic => {
        if ( !changing ) {
          changing = true;
          aProperty.value = aRange.constrainValue( quadratic.a );
          bProperty.value = bRange.constrainValue( quadratic.b );
          cProperty.value = cRange.constrainValue( quadratic.c );
          changing = false;
        }
      } );
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

      // y =
      const yEqualsNode = new RichText( StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } ), equationOptions );

      // a value
      const aNode = new NumberDisplay( aProperty, aProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_A,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_A
      } ) );

      // x^2 +
      const xSquaredPlusNode = new RichText( StringUtils.fillIn( '{{x}}<sup>2</sup> {{plus}}', {
        x: GQSymbols.x,
        plus: MathSymbols.PLUS
      } ), equationOptions );

      // b value
      const bNode = new NumberDisplay( bProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_B,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_B
      } ) );

      // x +
      const xPlusNode = new RichText( StringUtils.fillIn( '{{x}} {{plus}}', {
        x: GQSymbols.x,
        plus: MathSymbols.PLUS
      } ), equationOptions );

      // c value
      const cNode = new NumberDisplay( cProperty, bProperty.range, _.extend( {}, numberDisplayOptions, {
        numberFill: GQColors.EXPLORE_C,
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_C
      } ) );

      // y = ax^2 + bx + c
      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [ yEqualsNode, aNode, xSquaredPlusNode, bNode, xPlusNode, cNode ];

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
