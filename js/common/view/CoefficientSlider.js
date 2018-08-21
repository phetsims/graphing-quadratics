// Copyright 2018, University of Colorado Boulder

/**
 * Vertical slider for changing one of the coefficients in a quadratic equation.
 * The default response of this slider is linear.  To change the response, use options map and inverseMap.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSlider = require( 'SUN/HSlider' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const COEFFICIENT_LABEL_FONT = new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } );
  const TICK_LABEL_FONT = new PhetFont( GQConstants.SLIDER_TICK_LABEL_FONT_SIZE );
  const TRACK_SIZE = new Dimension2( 130, 1 );
  const THUMB_SIZE = new Dimension2( 20, 45 );

  class CoefficientSlider extends Node {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = _.extend( {

        // {Array.<number>|null} values where tick marks will be placed
        tickValues: [ 0 ],

        // maps coefficientProperty value to slider value
        map: value => { return value; },

        // maps slider value to coefficientProperty value
        inverseMap: value => { return value; },

        // If the absolute value of coefficientProperty is less than this value, snap to zero.
        snapToZeroEpsilon: 0.1,

        // superclass options
        align: 'center'
      }, options );

      // Map between value domains, determines how the slider responds.
      var sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {
        bidirectional: true,
        map: options.map,
        inverseMap: options.inverseMap
      } );

      // We don't have a vertical slider, so use a rotated HSlider.
      const slider = new HSlider( sliderProperty, coefficientProperty.range, {

        majorTickLength: 28,
        trackFill: 'black',
        trackSize: TRACK_SIZE,
        thumbSize: THUMB_SIZE,
        thumbTouchAreaYDilation: 8,

        // snap to zero
        constrainValue: function( value ) {
          var coefficientValue = options.inverseMap( value );
          return ( Math.abs( coefficientValue ) < options.snapToZeroEpsilon ) ? 0 : value;
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

      //TODO convert tick values to match scale
      // Create the tick labels, rotated opposite the HSlider, so that they'll look correct on the rotated HSlider.
      if ( options.tickValues ) {
        options.tickValues.forEach( tickValue => {
          slider.addMajorTick( options.map( tickValue ), new Text( tickValue, {
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
