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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSlider = require( 'SUN/HSlider' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // constants
  const TICK_COLOR = 'black';
  const TICK_LENGTH = 20;
  const TICK_WIDTH = 1;

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

  graphingQuadratics.register( 'VerticalSlider', VerticalSlider );

  return inherit( HSlider, VerticalSlider );
} );
