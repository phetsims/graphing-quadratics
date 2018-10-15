// Copyright 2018, University of Colorado Boulder

/**
 * A vertical slider for changing one of the coefficients in a quadratic equation, decorated with a label
 * above the slider. The default response of this slider is linear.  To change the response, use options 
 * map and inverseMap.
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

  class CoefficientSlider extends VSlider {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = _.extend( {

        // maps coefficientProperty.value to slider value (model to view)
        map: value => value,

        // maps slider value to coefficientProperty.value (view to model)
        inverseMap: value => value,

        // coefficientProperty.value will be set to a multiple of this value, in model coordinates
        interval: 1,

        // whether to skip zero value
        skipZero: false,

        // snap to zero if |coefficientProperty.value| < snapToZeroEpsilon,
        // set to 0 to disable snap to zero, ignored if skipZero:true, in model coordinates
        snapToZeroEpsilon: 0.1,

        // {Array.<number>|null} model values where major tick marks will be placed
        tickValues: [ 0 ],

        // {Color|string} color of the label that appears above the slider
        labelColor: 'black',

        // Slider options
        trackFill: 'black',
        trackSize: new Dimension2( 130, 1 ),
        thumbSize: new Dimension2( 20, 40 ),
        thumbTouchAreaYDilation: 8,
        tandem: Tandem.required

      }, options );

      // make ticks extend past the thumb
      assert && assert( options.majorTickLength === undefined, 'CoefficientSlider sets majorTickLength' );
      options.majorTickLength = ( options.thumbSize.height / 2 ) + 3;

      assert && assert( !options.constrainValue, 'CoefficientSlider sets constrainValue' );
      options.constrainValue = value => {
        let coefficientValue = options.inverseMap( value );
        if ( options.skipZero && ( Math.abs( coefficientValue ) < options.interval ) ) {
          // skip zero
          coefficientValue = ( coefficientProperty.value < 0 ) ? options.interval : -options.interval;
        }
        else if ( ( options.snapToZeroEpsilon !== 0 ) &&
                  ( Math.abs( coefficientValue ) < options.snapToZeroEpsilon ) ) {
          // snap to zero
          coefficientValue = 0;
        }
        return options.map( coefficientValue );
      };

      // Map between model and view domains, determines how the slider responds.
      // Do not instrument for PhET-iO, see https://github.com/phetsims/phet-io/issues/1374
      const sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {
        bidirectional: true,
        map: options.map,

        // apply options.interval to options.inverseMap (view to model)
        inverseMap: value => Util.roundToInterval( options.inverseMap( value ), options.interval ),

        // Reentry is necessary because this DynamicProperty is bidirectional, and when mapping from
        // view-to-model in inverseMap, our requirement is to snap to options.interval.  See #17.
        reentrant: true
      } );

      super( sliderProperty, coefficientProperty.range, options );

      // Create the tick labels
      if ( options.tickValues ) {
        options.tickValues.forEach( tickValue => {
          this.addMajorTick( options.map( tickValue ), new Text( tickValue, {
            font: TICK_LABEL_FONT
          } ) );
        } );
      }

      // Label that appears above the slider.
      const label = new RichText( symbol, {
        font: COEFFICIENT_LABEL_FONT,
        fill: options.labelColor,
        centerX: this.x,
        bottom: this.top - 2,
        maxWidth: 20, // determined empirically
        tandem: options.tandem.createTandem( 'label' )
      } );
      this.addChild( label );
    }
  }

  return graphingQuadratics.register( 'CoefficientSlider', CoefficientSlider );
} );
