// Copyright 2018, University of Colorado Boulder

/**
 * Vertical slider for changing one of the coefficients in a quadratic equation.
 * The default response of this slider is linear.  To change the response, use options map and inverseMap.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const DynamicProperty = require( 'AXON/DynamicProperty' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VSlider = require( 'SUN/VSlider' );

  // constants
  const COEFFICIENT_LABEL_FONT = new PhetFont( { size: GQConstants.INTERACTIVE_EQUATION_FONT_SIZE, weight: 'bold' } );
  const TICK_LABEL_FONT = new PhetFont( GQConstants.SLIDER_TICK_LABEL_FONT_SIZE );
  const TRACK_SIZE = new Dimension2( 130, 1 );
  const THUMB_SIZE = new Dimension2( 20, 40 );

  class CoefficientSlider extends Node {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = _.extend( {

        // {Array.<number>|null} values where major tick marks will be placed
        tickValues: [ 0 ],

        // maps coefficientProperty.value to slider value
        map: value => value,

        // maps slider value to coefficientProperty.value
        inverseMap: value => value,

        // whether to skip zero value
        skipZero: false,

        // snap to zero if |coefficientProperty.value| < snapToZeroEpsilon
        snapToZeroEpsilon: 0.1,

        // coefficientProperty.value will be a multiple of this interval
        interval: 1,

        // {Color|string} color of the label that appears above the slider
        labelColor: 'black',

        tandem: Tandem.required
      }, options );

      // Map between value domains, determines how the slider responds.
      // Do not instrument for PhET-iO, see https://github.com/phetsims/phet-io/issues/1374
      const sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {
        reentrant: true, //TODO #17
        bidirectional: true,
        map: options.map,

        // apply interval to options.inverseMap
        inverseMap: value => Util.roundToInterval( options.inverseMap( value ), options.interval )
      } );

      const slider = new VSlider( sliderProperty, coefficientProperty.range, {

        trackFill: 'black',
        trackSize: TRACK_SIZE,
        thumbSize: THUMB_SIZE,
        thumbTouchAreaYDilation: 8,
        majorTickLength: ( THUMB_SIZE.height / 2 ) + 3, // so that ticks extends past thumb

        constrainValue: value => {
          let coefficientValue = options.inverseMap( value );
          if ( Math.abs( coefficientValue ) < options.snapToZeroEpsilon ) {
            if ( options.skipZero ) {
              // skip zero
              coefficientValue = ( coefficientProperty.value < 0 ) ? options.interval : -options.interval;
            }
            else {
              // snap to zero
              coefficientValue = 0;
            }
          }
          return options.map( coefficientValue );
        },
        tandem: options.tandem.createTandem( 'slider' )
      } );

      // Coefficient label that appears above the slider.
      const label = new RichText( symbol, {
        font: COEFFICIENT_LABEL_FONT,
        fill: options.labelColor,
        centerX: slider.centerX,
        bottom: slider.top - 2,
        maxWidth: 20, // determined empirically
        tandem: options.tandem.createTandem( 'label' )
      } );

      // Create the tick labels
      if ( options.tickValues ) {
        options.tickValues.forEach( tickValue => {
          slider.addMajorTick( options.map( tickValue ), new Text( tickValue, {
            font: TICK_LABEL_FONT
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
