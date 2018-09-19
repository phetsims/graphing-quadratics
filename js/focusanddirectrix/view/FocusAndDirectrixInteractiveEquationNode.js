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
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
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

      options = options || {};

      // coefficient Properties
      const pProperty = new NumberProperty( pRange.defaultValue, { range: pRange, reentrant: true } );
      const hProperty = new NumberProperty( hRange.defaultValue, { range: hRange, reentrant: true } );
      const kProperty = new NumberProperty( kRange.defaultValue, { range: kRange, reentrant: true } );

      // coefficient sliders
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

      var hBox = new HBox( {
        spacing: 40,
        children: [ pSlider, hSlider, kSlider ]
      } );

      // Invisible, provides constant size for equation area.
      var equationParentNode = new Rectangle( 0, 0, 1.25 * hBox.width, 75 );

      assert && assert( !options.children, 'FocusAndDirectrixInteractiveEquationNode sets children' );
      options.children = [
        new VBox( {
          spacing: 3,
          children: [
            equationParentNode,
            hBox
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

          //TODO this is expensive, may impact UI responsiveness
          // update the equation above the sliders
          equationParentNode.removeAllChildren();
          const equationNode = new EquationNode( p, h, k, {
            maxWidth: equationParentNode.width,
            maxHeight: equationParentNode.height,
            center: equationParentNode.center
          } );
          equationParentNode.addChild( equationNode );

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
   * Equation that appears above sliders, shows current values, color coded.
   */
  class EquationNode extends HBox {

    /**
     * @param {number} p
     * @param {number} h
     * @param {number} k
     * @param {Object} [options]
     */
    constructor( p, h, k, options ) {

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

      assert && assert( !options.children, 'DynamicEquationNode sets children' );
      options.children = [];

      // y =
      const yEqualsString = StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } );
      const yEqualsNode = new RichText( yEqualsString, {
        font: options.font,
        fill: options.color
      } );
      options.children.push( yEqualsNode );

      // 1
      const numeratorNode = new RichText( '1', {
        font: options.fractionFont,
        fill: options.color
      } );

      // 4(
      const fourParenNode = new RichText( '4(', {
        font: options.fractionFont,
        fill: options.color
      } );

      // p
      const pNode = new RichText( p, {
        font: options.fractionFont,
        fill: options.pColor
      } );

      // )
      const parenNode = new RichText( ')', {
        font: options.fractionFont,
        fill: options.color
      } );

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
      const xMinusString = StringUtils.fillIn( '({{x}} {{minus}}', {
        x: GQSymbols.x,
        minus: MathSymbols.MINUS
      } );
      const xMinusNode = new RichText( xMinusString, {
        font: options.font,
        fill: options.color
      } );
      options.children.push( xMinusNode );

      // h
      const hNode = new RichText( h, {
        font: options.font,
        fill: options.hColor
      } );
      options.children.push( hNode );

      // )^2 +
      const squaredPlusString = StringUtils.fillIn( ')<sup>2</sup> {{plus}}', {
        plus: MathSymbols.PLUS
      } );
      const squaredPlusNode = new RichText( squaredPlusString, {
        font: options.font,
        fill: options.color
      } );
      options.children.push( squaredPlusNode );

      // k
      const kNode = new RichText( k, {
        font: options.font,
        fill: options.hColor
      } );
      options.children.push( kNode );

      super( options );
    }
  }

  graphingQuadratics.register( 'FocusAndDirectrixInteractiveEquationNode.EquationNode', EquationNode );

  return FocusAndDirectrixInteractiveEquationNode;
} );
