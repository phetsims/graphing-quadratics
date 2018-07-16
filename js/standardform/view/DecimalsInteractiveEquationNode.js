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
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.MATH_SYMBOL_FONT };
  var TICK_COLOR = 'black';
  var TICK_LENGTH = 10;
  var TICK_WIDTH = 2;

  /**
   * @param {Property.<Number>} aProperty - the coefficient for x^2 in the quadratic
   * @param {Property.<Number>} bProperty - the coefficient for x in the quadratic
   * @param {Property.<Number>} cProperty - the constant term in the quadratic
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsInteractiveEquationNode( aProperty, bProperty, cProperty, options ) {

      // interactive components of the equation
      var aSlider = new VerticalSlider( aProperty );
      var bSlider = new VerticalSlider( bProperty );
      var cSlider = new VerticalSlider( cProperty );

    HBox.call( this, {
        children: [
          new RichText( yString, TEXT_OPTIONS ),
          new RichText( MathSymbols.EQUAL_TO, TEXT_OPTIONS ),
          aSlider,
          new RichText( xSquaredString, TEXT_OPTIONS ),
          new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
          bSlider,
          new RichText( xString, TEXT_OPTIONS ),
          new RichText( MathSymbols.PLUS, TEXT_OPTIONS ),
          cSlider
        ],
        align: 'center',
        spacing: 10
      } );
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
