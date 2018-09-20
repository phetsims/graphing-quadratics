// Copyright 2018, University of Colorado Boulder

/**
 * Interactive equation for the 'Focus & Directrix' screen.
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

      options = _.extend( {
        font: new PhetFont( 26 ),
        fractionFont: new PhetFont( 22 ),
        color: 'black',
        pColor: GQColors.FOCUS_AND_DIRECTRIX_P,
        hColor: GQColors.FOCUS_AND_DIRECTRIX_H,
        kColor: GQColors.FOCUS_AND_DIRECTRIX_K
      }, options );

      // coefficient Properties
      const pProperty = new NumberProperty( pRange.defaultValue, { range: pRange, reentrant: true } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange, reentrant: true } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange, reentrant: true } );

      // equation
      const equationNode = new EquationNode( pProperty, pRange, hProperty, hRange, kProperty, kRange );
      
      // sliders
      const pSlider = new CoefficientSlider( GQSymbols.p, pProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_P,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_P
      } );
      const hSlider = new CoefficientSlider( GQSymbols.h, hProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_H,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_H
      } );
      const kSlider = new CoefficientSlider( GQSymbols.k, kProperty, {
        interval: GQConstants.FOCUS_AND_DIRECTRIX_SLIDER_INTERVAL_K,
        labelColor: GQColors.FOCUS_AND_DIRECTRIX_K
      } );
      var sliders = new HBox( {
        spacing: 40,
        children: [ pSlider, hSlider, kSlider ]
      } );

      assert && assert( !options.children, 'FocusAndDirectrixInteractiveEquationNode sets children' );
      options.children = [
        new VBox( {
          resize: false,
          align: 'center',
          spacing: 3,
          children: [
            equationNode,
            sliders
          ]
        } )
      ];

      super( options );

      //TODO hack to prevent 'call stack size exceeded'
      let changing = false;

      // When the coefficients change, update the quadratic.
      Property.multilink( [ pProperty, hProperty, kProperty ], ( p, h, k ) => {
        if ( !changing ) {
          changing = true;
          //TODO handle p === 0, which results in x=h
          if ( p !== 0 ) {
            quadraticProperty.value = Quadratic.createFromAlternateVertexForm( p, h, k, { color: quadraticProperty.value.color } );
          }
          changing = false;
        }
      } );

      // When the quadratic changes, update the coefficients
      quadraticProperty.link( quadratic => {
        if ( !changing ) {
          changing = true;
          //TODO handle non-quadratic
          if ( quadratic.a !== 0 ) {
            pProperty.value = quadratic.p;
            hProperty.value = quadratic.h;
            kProperty.value = quadratic.k;
          }
          changing = false;
        }
      } );
    }
  }

  graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode', FocusAndDirectrixInteractiveEquationNode );

  /**
   * The equation that appears above the sliders.
   */
  class EquationNode extends HBox {

    /**
     * @param {NumberProperty} pProperty
     * @param {Range} pRange
     * @param {NumberProperty} hProperty
     * @param {Range} hRange
     * @param {NumberProperty} kProperty
     * @param {Range} kRange
     * @param {Object} [options]
     */
    constructor( pProperty, pRange, hProperty, hRange, kProperty, kRange, options ) {

      options = _.extend( {
        font: new PhetFont( 26 ),
        fractionFont: new PhetFont( 22 ),
        color: 'black',
        pColor: GQColors.FOCUS_AND_DIRECTRIX_P,
        hColor: GQColors.FOCUS_AND_DIRECTRIX_H,
        kColor: GQColors.FOCUS_AND_DIRECTRIX_K,

        // HBox options
        spacing: 5
      }, options );

      assert && assert( !options.children, 'EquationNode sets children' );
      options.children = [];

      const equationOptions = {
        font: options.font,
        fill: options.color
      };
      const fractionOptions = {
        font: options.fractionFont,
        fill: options.color
      };

      // y =
      const yEqualsNode = new RichText( StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } ), equationOptions );
      options.children.push( yEqualsNode );

      // 1
      const numeratorNode = new RichText( '1', fractionOptions );

      // 4(
      const fourParenNode = new RichText( '4(', fractionOptions );

      // p
      const numberDisplayOptions = {
        decimalPlaces: 1,
        font: options.font,
        backgroundFill: null,
        backgroundStroke: null,
        backgroundLineWidth: 0,
        xMargin: 0,
        yMargin: 0
      };
      const pNode = new NumberDisplay( pProperty, pRange, _.extend( {}, numberDisplayOptions, {
        numberFill: options.pColor,
        font: options.fractionFont
      } ) );

      // )
      const parenNode = new RichText( ')', fractionOptions );

      // 1/4(p)
      const denominatorNode = new HBox( {
        children: [ fourParenNode, pNode, parenNode ]
      } );

      // horizontal line between numerator and denominator
      const fractionLineLength = 1.25 * Math.max( numeratorNode.width, denominatorNode.width );
      const fractionLine = new Line( 0, 0, fractionLineLength, 0, {
        stroke: options.color,
        lineWidth: 1
      } );

      // 1/4p
      const fractionNode = new VBox( {
        spacing: 2,
        children: [ numeratorNode, fractionLine, denominatorNode ]
      } );
      options.children.push( fractionNode );

      // (x -
      const xMinusNode = new RichText( StringUtils.fillIn( '({{x}} {{minus}}', {
        x: GQSymbols.x,
        minus: MathSymbols.MINUS
      } ), equationOptions );
      options.children.push( xMinusNode );

      // h
      const hNode = new NumberDisplay( hProperty, hRange, _.extend( {}, numberDisplayOptions, {
        numberFill: options.hColor,
        font: options.fractionFont
      } ) );
      options.children.push( hNode );

      // )^2 +
      const squaredPlusNode = new RichText( StringUtils.fillIn( ')<sup>2</sup> {{plus}}', {
        plus: MathSymbols.PLUS
      } ), equationOptions );
      options.children.push( squaredPlusNode );

      // k
      const kNode = new NumberDisplay( kProperty, kRange, _.extend( {}, numberDisplayOptions, {
        numberFill: options.kColor,
        font: options.fractionFont
      } ) );
      options.children.push( kNode );

      super( options );
    }
  }

  graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode.EquationNode', EquationNode );
  
  return FocusAndDirectrixInteractiveEquationNode;
} );
