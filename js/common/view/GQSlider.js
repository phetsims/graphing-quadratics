// Copyright 2018, University of Colorado Boulder

/**
 * GQSlider is the base type for sliders in this sim. It adds the following features to VSlider:
 *
 * - snap to interval (see interval)
 * - snap to zero (see snapToZero)
 * - skip zero (see skipZero)
 * - change the taper (see map and inverseMap)
 * - a label about the slider
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
  const Range = require( 'DOT/Range' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VSlider = require( 'SUN/VSlider' );

  // constants
  const IDENTITY_FUNCTION = value => value;
  const DEFAULT_TICK_VALUES = [ 0 ];
  const DEFAULT_TRACK_SIZE = new Dimension2( 130, 1 );
  const DEFAULT_THUMB_SIZE = new Dimension2( 20, 40 );

  class GQSlider extends VSlider {

    /**
     * @param {string} symbol - the coefficient's symbol
     * @param {NumberProperty} coefficientProperty - the coefficient's value
     * @param {Object} [options]
     */
    constructor( symbol, coefficientProperty, options ) {

      options = _.extend( {

        // maps from model to view (coefficientProperty to sliderProperty)
        map: IDENTITY_FUNCTION,

        // maps from view to model (sliderProperty to coefficientProperty)
        inverseMap: IDENTITY_FUNCTION,

        // coefficientProperty.value will be set to a multiple of this value, in model coordinates
        interval: 1,

        // whether to skip zero value
        skipZero: false,

        // whether to snap to zero when the drag ends
        snapToZero: true,

        // {number|null} snap to zero when this close to zero. Ignored if snapToZero:false.
        // Must be >= options.interval, and defaults to options.interval
        snapToZeroEpsilon: null,

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
        tandem: Tandem.required,

        // Since GQSlider runs on DynamicProperty, provide a way to have a LinkedElement directly to the PhET-iO
        // instrumented model Property.
        phetioLinkedProperty: coefficientProperty

      }, options );

      assert && assert( options.interval > 0, 'invalid interval: ' + options.interval );

      // default and validation for options.snapToZeroEpsilon
      if ( options.snapToZero ) {
        if ( options.snapToZeroEpsilon === null ) {
          options.snapToZeroEpsilon = options.interval;
        }
        assert && assert( ( options.snapToZeroEpsilon >= 0 ) && ( options.snapToZeroEpsilon >= options.interval ),
          'invalid snapToZeroEpsilon: ' + options.snapToZeroEpsilon );
      }

      // make tick mark lines extend past the thumb
      assert && assert( options.majorTickLength === undefined, 'GQSlider sets majorTickLength' );
      options.majorTickLength = ( options.thumbSize.height / 2 ) + 3;

      // apply constrains to the view value
      assert && assert( !options.constrainValue, 'GQSlider sets constrainValue' );
      options.constrainValue = viewValue => {

        if ( options.skipZero ) {

          // map from view to model
          const newModelValue = options.inverseMap( viewValue );

          // skip zero
          if ( Math.abs( newModelValue ) < options.interval ) {
            return options.map( ( newModelValue > 0 ) ? options.interval : -options.interval );
          }
        }

        // no constraint applied
        return viewValue;
      };

      // snap to zero when the drag ends
      assert && assert( !options.endDrag, 'GQSlider sets endDrag' );
      if ( !options.skipZero && options.snapToZero ) {
        options.endDrag = () => {
          if ( ( Math.abs( coefficientProperty.value ) < options.snapToZeroEpsilon ) ) {
            coefficientProperty.value = 0;
          }
        };
      }

      // Map between model and view domains, determines how the slider responds.
      // Do not instrument for PhET-iO, see https://github.com/phetsims/phet-io/issues/1374
      const sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {

        bidirectional: true,

        // map from model to view (coefficientProperty to sliderProperty)
        map: value => options.map( value ),

        // map from view to model (sliderProperty to coefficientProperty), apply options.interval to model value
        inverseMap: value => Util.roundToInterval( options.inverseMap( value ), options.interval )
      } );

      // Convert the range from model to view
      assert && assert( coefficientProperty.range, 'coefficientProperty.range is missing' );
      const sliderRange = new Range(
        options.map( coefficientProperty.range.min ),
        options.map( coefficientProperty.range.max )
      );

      // Provide view Property and Range to VSlider
      super( sliderProperty, sliderRange, options );

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

  return graphingQuadratics.register( 'GQSlider', GQSlider );
} );
