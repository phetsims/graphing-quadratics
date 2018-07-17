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
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var aString = require( 'string!GRAPHING_QUADRATICS/a' );
  var bString = require( 'string!GRAPHING_QUADRATICS/b' );
  var cString = require( 'string!GRAPHING_QUADRATICS/c' );
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  var TICK_COLOR = 'black';
  var TICK_LENGTH = 10;
  var TICK_WIDTH = 2;
  var READOUT_OPTIONS = {
    backgroundFill: null,
    minWidth: 55,
    yMargin: 0,
    font: new GQFont( 24 ),
    decimalPlaces: 1,
    textFill: 'red'
  };

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} bProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} cProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsInteractiveEquationNode( aProperty, bProperty, cProperty, options ) {

    var aReadout = new NumberBackgroundNode(
      aProperty,
      _.extend( {}, READOUT_OPTIONS, { decimalPlaces: 2, minWidth: 70  } )
    );
    var bReadout = new NumberBackgroundNode( bProperty, READOUT_OPTIONS );
    var cReadout = new NumberBackgroundNode( cProperty, READOUT_OPTIONS );

    var aXSquared = new HBox( {
      children: [ aReadout, new RichText( xSquaredString, TEXT_OPTIONS ) ],
      align: 'bottom'
    } );
    var bX = new HBox( {
      children: [ bReadout, new RichText( xString, TEXT_OPTIONS ) ],
      align: 'bottom'
    } );

    var readout = new HBox( {
      children: [
        new RichText( yString, TEXT_OPTIONS ),
        new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS ),
        aXSquared,
        new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
        bX,
        new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
        cReadout
      ],
      align: 'bottom',
      spacing: 10
    } );
    //
    // var aLinearProperty = new NumberProperty( 0, { range: aProperty.range } );
    // aProperty.link( function( a ) {
    //   aLinearProperty.set( Util.cubeRoot( a / 6 ) * 6 );
    // } );
    // aLinearProperty.link( function( aLinear ) {
    //   aProperty.set( Math.pow( aLinear / 6, 3 ) * 6 );
    // } );

    var aControl = new VBox( {
      children: [
        new Text( aString, TEXT_OPTIONS ),
        new VerticalSlider( aProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 2 ); // two decimal places
          }
        } )
      ],
      align: 'center',
      centerX: aReadout.parentToGlobalPoint( aReadout.center ).x,
      top: aReadout.bottom
    } );

    var bControl = new VBox( {
      children: [
        new Text( bString, TEXT_OPTIONS ),
        new VerticalSlider( bProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 1 ); // one decimal place
          }
        } )
      ],
      align: 'center',
      centerX: bReadout.parentToGlobalPoint( bReadout.center ).x,
      top: bReadout.bottom
    } );

    var cControl = new VBox( {
      children: [
        new Text( cString, TEXT_OPTIONS ),
        new VerticalSlider( cProperty, {
          constrainValue: function( value ) {
            return Util.toFixedNumber( value, 1 ); // one decimal place
          }
        } )
      ],
      align: 'center',
      centerX: cReadout.centerX,
      top: cReadout.bottom
    } );

    Node.call( this, { children: [ readout, aControl, bControl, cControl ] } );

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
      trackSize: new Dimension2( 190, 1 ),
      thumbSize: new Dimension2( 15, 30 ),
      thumbTouchAreaYDilation: 8
    }, options );

    HSlider.call( this, property, property.range, options );

    // HSlider does not support a tick that is centered on the track.  We need to use our own tick node here.
    var trackCenterX = options.trackSize.width / 2;
    var tickYOffset = options.trackSize.height / 2;

    var tickNode = new Line( trackCenterX, -TICK_LENGTH, trackCenterX, TICK_LENGTH + tickYOffset, {
      stroke: TICK_COLOR,
      lineWidth: TICK_WIDTH
    } );

    // add the tick as a child and move it behind the slider thumb
    this.addChild( tickNode );
    tickNode.moveToBack();

    // make vertical slider by rotating it
    this.rotate( -Math.PI / 2 );

  }

  graphingQuadratics.register( 'VerticalSlider', VerticalSlider );

  inherit( HSlider, VerticalSlider );

  return DecimalsInteractiveEquationNode;
} );
