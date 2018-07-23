// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer cofficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSlider = require( 'SUN/HSlider' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const bString = require( 'string!GRAPHING_QUADRATICS/b' );
  const cString = require( 'string!GRAPHING_QUADRATICS/c' );
  const xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  const TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  const RED_TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT, fill: 'red' };
  const TICK_COLOR = 'black';
  const TICK_LENGTH = 20;
  const TICK_WIDTH = 1;
  const READOUT_OPTIONS = {
    font: GQFont.NUMBER_FONT,
    numberFill: 'red',
    backgroundFill: null,
    backgroundStroke: null,
    decimalPlaces: 1,
    xMargin: 0,
    yMargin: 0
  };

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} bProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} cProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsInteractiveEquationNode( aProperty, bProperty, cProperty, options ) {

    const aReadout = new NumberDisplay(
      aProperty,
      aProperty.range,
      _.extend( {}, READOUT_OPTIONS, { decimalPlaces: 2 } )
    );
    const bReadout = new NumberDisplay( bProperty, bProperty.range, READOUT_OPTIONS );
    const cReadout = new NumberDisplay( cProperty, bProperty.range, READOUT_OPTIONS );

    const yText = new RichText( yString, TEXT_OPTIONS );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS );
    const xSquaredText = new RichText( xSquaredString, TEXT_OPTIONS );
    const plusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );
    const xText = new RichText( xString, TEXT_OPTIONS );
    const secondPlusText = new RichText( MathSymbols.PLUS, TEXT_OPTIONS );

    //
    // const aLinearProperty = new NumberProperty( 0, { range: aProperty.range } );
    // aProperty.link( function( a ) {
    //   aLinearProperty.set( Util.cubeRoot( a / 6 ) * 6 );
    // } );
    // aLinearProperty.link( function( aLinear ) {
    //   aProperty.set( Math.pow( aLinear / 6, 3 ) * 6 );
    // } );

    const aControl = new VBox( {
      children: [
        new Text( aString, RED_TEXT_OPTIONS ),
        new VerticalSlider( aProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 2 ); // two decimal places
          }
        } )
      ],
      align: 'center'
    } );

    const bControl = new VBox( {
      children: [
        new Text( bString, RED_TEXT_OPTIONS ),
        new VerticalSlider( bProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 1 ); // one decimal place
          }
        } )
      ],
      align: 'center'
    } );

    const cControl = new VBox( {
      children: [
        new Text( cString, RED_TEXT_OPTIONS ),
        new VerticalSlider( cProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 1 ); // one decimal place
          }
        } )
      ],
      align: 'center'
    } );

    Node.call( this, {
      children: [
        yText,
        equalToText,
        aReadout,
        xSquaredText,
        plusText,
        bReadout,
        xText,
        secondPlusText,
        cReadout,
        aControl,
        bControl,
        cControl
      ]
    } );

    // alignment
    equalToText.left = yText.right + 10;
    aReadout.left = equalToText.right + 10;
    xSquaredText.left = aReadout.right + 5;
    plusText.left = xSquaredText.right + 10;
    bReadout.left = plusText.right + 10;
    xText.left = bReadout.right + 5;
    secondPlusText.left = xText.right + 10;
    cReadout.left = secondPlusText.right + 10;
    equalToText.bottom = yText.bottom;
    xSquaredText.bottom = yText.bottom;
    plusText.bottom = yText.bottom;
    xText.bottom = yText.bottom;
    secondPlusText.bottom = yText.bottom;
    aReadout.bottom = yText.bottom;
    bReadout.bottom = yText.bottom;
    cReadout.bottom = yText.bottom;
    aControl.centerX = aReadout.centerX;
    bControl.centerX = bReadout.centerX;
    cControl.centerX = cReadout.centerX;
    aControl.top = aReadout.bottom + 5;
    bControl.top = bReadout.bottom + 5;
    cControl.top = cReadout.bottom + 5;
  }

  graphingQuadratics.register( 'DecimalsInteractiveEquationNode', DecimalsInteractiveEquationNode );

  inherit( HBox, DecimalsInteractiveEquationNode );

  /**
   * Create a vertical slider with a central tick
   * @param {NumberProperty} property parameter to track.
   * @param {Object} [options] for slider node.
   * @constructor
   */
  function VerticalSlider( property, options ) {

    options = _.extend( {
      trackFill: 'black',
      trackSize: new Dimension2( 160, 1 ),
      thumbSize: new Dimension2( 15, 25 ),
      thumbTouchAreaYDilation: 8
    }, options );

    HSlider.call( this, property, property.range, options );

    // HSlider does not support a tick that is centered on the track.  We need to use our own tick node here.
    const trackCenterX = options.trackSize.width / 2;
    const tickYOffset = options.trackSize.height / 2;

    const tickNode = new Line( trackCenterX, -TICK_LENGTH, trackCenterX, TICK_LENGTH + tickYOffset, {
      stroke: TICK_COLOR,
      lineWidth: TICK_WIDTH
    } );

    // label the zero tick mark
    const tickText = new Text( '0', { bottom: tickNode.top - 5, centerX: tickNode.centerX + 1, rotation: Math.PI / 2 } );
    this.addChild( tickText );

    // to balance out the zero label
    const strutForSymmetry = new VStrut( tickText.width - 3, { top: tickNode.bottom + 5 } );
    this.addChild( strutForSymmetry );

    // add the tick as a child and move it behind the slider thumb
    this.addChild( tickNode );
    tickNode.moveToBack();

    // make vertical slider by rotating it
    this.rotate( -Math.PI / 2 );

  }

  graphingQuadratics.register( 'DecimalsInteractiveEquationNode.VerticalSlider', VerticalSlider );

  inherit( HSlider, VerticalSlider );

  return DecimalsInteractiveEquationNode;
} );
