// Copyright 2018, University of Colorado Boulder

/**
 * Create a vertical slider with a central tick
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSlider = require( 'SUN/HSlider' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );

  // constants
  const TICK_COLOR = 'black';
  const TICK_LENGTH = 20;
  const TICK_WIDTH = 1;

  class SliderUnit extends VBox {

    /**
     * @param {string} string
     * @param {NumberProperty} property
     * @param {number} decimalPlaces
     * @param {Object} [options] for slider node.
     */
    constructor( string, property, decimalPlaces, options ) {

      options = _.extend( {
        align: 'center',
        centralTick: true,
        trackFill: 'black',
        trackSize: new Dimension2( 160, 1 ),
        thumbSize: new Dimension2( 15, 25 ),
        thumbTouchAreaYDilation: 8
      }, options );

      super( options );

      const slider = new HSlider( property, property.range, {
        trackFill: options.trackFill,
        trackSize: options.trackSize,
        thumbSize: options.thumbSize,
        thumbTouchAreaYDilation: options.thumbTouchAreaYDilation
      } );

      if ( options.centralTick ) {

        // HSlider does not support a tick that is centered on the track.  We need to use our own tick node here.
        const trackCenterX = options.trackSize.width / 2;
        const tickYOffset = options.trackSize.height / 2;

        const tickNode = new Line( trackCenterX, -TICK_LENGTH, trackCenterX, TICK_LENGTH + tickYOffset, {
          stroke: TICK_COLOR,
          lineWidth: TICK_WIDTH
        } );

        // label the zero tick mark
        const tickText = new Text( '0', {
          bottom: tickNode.top - 5,
          centerX: tickNode.centerX + 1,
          rotation: Math.PI / 2
        } );
        slider.addChild( tickText );

        // to balance out the zero label
        const strutForSymmetry = new VStrut( tickText.width - 3, { top: tickNode.bottom + 5 } );
        slider.addChild( strutForSymmetry );

        // add the tick as a child and move it behind the slider thumb
        slider.addChild( tickNode );
        tickNode.moveToBack();

        this.addChild( new Text( string, { font: GQFont.MATH_SYMBOL_FONT, fill: 'red' } ) );
      }

      this.addChild( slider );

      // make vertical slider by rotating it
      slider.rotate( -Math.PI / 2 );
    }
  }

  return graphingQuadratics.register( 'SliderUnit', SliderUnit );
} );
