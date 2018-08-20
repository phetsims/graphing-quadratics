// Copyright 2018, University of Colorado Boulder

/**
 * Vertical slider for changing one of the coefficients in a quadratic equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSlider = require( 'SUN/HSlider' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const COEFFICIENT_LABEL_FONT = new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } );
  const TICK_LABEL_FONT = new PhetFont( GQConstants.SLIDER_TICK_LABEL_FONT_SIZE );
  const TRACK_SIZE = new Dimension2( 130, 1 );
  const THUMB_SIZE = new Dimension2( 20, 45 );

  class CoefficientSlider extends Node {

    /**
     * @param {string} symbol
     * @param {NumberProperty} property
     * @param {Object} [options]
     */
    constructor( symbol, property, options ) {

      options = _.extend( {

        // {Array.<number>|null} values where tick marks will be placed
        tickValues: [ 0 ],

        // superclass options
        align: 'center'
      }, options );

      // We don't have a vertical slider, so use a rotated HSlider.
      const slider = new HSlider( property, property.range, {

        majorTickLength: 28,
        trackFill: 'black',
        trackSize: TRACK_SIZE,
        thumbSize: THUMB_SIZE,
        thumbTouchAreaYDilation: 8,

        // snap to zero
        constrainValue: function( value ) {
          return ( Math.abs( value ) < 0.01 ) ? 0 : value;
        }
      } );
      slider.rotate( -Math.PI / 2 );

      // Coefficient label that appears above the slider. Position this after rotating the slider,
      // but before adding ticks, so that the label is horizontally centered on the track.
      const label = new RichText( symbol, {
        font: COEFFICIENT_LABEL_FONT,
        fill: GQColors.INTERACTIVE_CURVE,
        centerX: slider.centerX,
        bottom: slider.top - 5
      } );

      // Create the tick labels, rotated opposite the HSlider, so that they'll look correct on the rotated HSlider.
      if ( options.tickValues ) {
        options.tickValues.forEach( tickValue => {
          slider.addMajorTick( tickValue, new Text( tickValue, {
            font: TICK_LABEL_FONT,
            rotation: -slider.rotation
          } ) );
        } );
      }

      assert && assert( !options.children, 'CoefficientSlider sets children' );
      options.children = [ label, slider ];

      super( options );
    }
  }

  return graphingQuadratics.register( 'CoefficientSlider', CoefficientSlider );
} );
