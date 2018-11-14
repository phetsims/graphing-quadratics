// Copyright 2018, University of Colorado Boulder

/**
 * A vertical slider for changing one of the coefficients in a quadratic equation, decorated with a label above
 * the slider. The default taper (relationship between value and position of the thumb) is linear.
 * To change the taper, use options map and inverseMap.
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
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VSlider = require( 'SUN/VSlider' );

  // constants
  const DEFAULT_MAP = value => value;
  const DEFAULT_TICK_VALUES = [ 0 ];
  const DEFAULT_TRACK_SIZE = new Dimension2( 130, 1 );
  const DEFAULT_THUMB_SIZE = new Dimension2( 20, 40 );

  class CoefficientSlider extends VSlider {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = _.extend( {

        // maps coefficientProperty.value to slider value (model to view)
        map: DEFAULT_MAP,

        // maps slider value to coefficientProperty.value (view to model)
        inverseMap: DEFAULT_MAP,

        // coefficientProperty.value will be set to a multiple of this value, in model coordinates
        interval: 1,

        // whether to skip zero value
        skipZero: false,

        // snap to zero if |coefficientProperty.value| < snapToZeroEpsilon,
        // set to 0 to disable snap to zero, ignored if skipZero:true, in model coordinates
        snapToZeroEpsilon: 0.1,

        // {Array.<number>|null} model values where major tick marks will be placed
        tickValues: DEFAULT_TICK_VALUES,

        // {Color|string} color of the label that appears above the slider
        labelColor: 'black',

        // Slider options
        trackFill: 'black',
        trackSize: DEFAULT_TRACK_SIZE,
        thumbSize: DEFAULT_THUMB_SIZE,
        thumbTouchAreaYDilation: 8,

        // phet-io
        tandem: Tandem.required

      }, options );

      // make ticks extend past the thumb
      assert && assert( options.majorTickLength === undefined, 'CoefficientSlider sets majorTickLength' );
      options.majorTickLength = ( options.thumbSize.height / 2 ) + 3;

      // apply constrains to the view value
      assert && assert( !options.constrainValue, 'CoefficientSlider sets constrainValue' );
      options.constrainValue = viewValue => {

        // map from view to model, because constraint decisions are based on model value
        let modelValue = options.inverseMap( viewValue );

        // skip zero
        if ( options.skipZero && ( Math.abs( modelValue ) < options.interval ) ) {
          return options.map( ( coefficientProperty.value < 0 ) ? options.interval : -options.interval );
        }
        
        // snap to zero
        if ( ( options.snapToZeroEpsilon !== 0 ) && ( Math.abs( modelValue ) < options.snapToZeroEpsilon ) ) {

          return options.map( 0 );
        }

        // no constraint applied
        return viewValue;
      };

      // Map between model and view domains, determines how the slider responds.
      // Do not instrument for PhET-iO, see https://github.com/phetsims/phet-io/issues/1374
      const sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {

        bidirectional: true,

        // See #17. Necessary because bidirectional:true and we're snapping to options.interval.
        reentrant: true,

        // map from model to view
        map: value => options.map( value ),

        // map from view to model, apply options.interval to model value
        inverseMap: value => Util.roundToInterval( options.inverseMap( value ), options.interval )
      } );

      super( sliderProperty, coefficientProperty.range, options );

      // Create the tick labels
      if ( options.tickValues ) {
        options.tickValues.forEach( tickValue => {
          this.addMajorTick( options.map( tickValue ), new Text( tickValue, {
            font: GQConstants.SLIDER_TICK_LABEL_FONT
          } ) );
        } );
      }

      // Label that appears above the slider.
      const label = new RichText( symbol, {
        font: GQConstants.SLIDER_LABEL_FONT,
        fill: options.labelColor,
        centerX: this.x,
        bottom: this.top - 2,
        maxWidth: 20, // determined empirically
        tandem: options.tandem.createTandem( 'label' ),
        phetioDocumentation: 'the label above this slider'
      } );
      this.addChild( label );
    }
  }

  return graphingQuadratics.register( 'CoefficientSlider', CoefficientSlider );
} );
