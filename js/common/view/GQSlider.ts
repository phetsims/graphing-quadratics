// Copyright 2018-2024, University of Colorado Boulder

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

import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import VSlider, { VSliderOptions } from '../../../../sun/js/VSlider.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';

type TransformFunction = ( value: number ) => number;

const IDENTITY_FUNCTION: TransformFunction = value => value;
const DEFAULT_TICK_VALUES = [ 0 ];
const TRACK_SIZE = new Dimension2( 1, 130 );
const THUMB_SIZE = new Dimension2( 40, 20 );

type SelfOptions = {

  // maps from model to view (coefficientProperty to sliderProperty)
  map?: TransformFunction;

  // maps from view to model (sliderProperty to coefficientProperty)
  inverseMap?: TransformFunction;

  // coefficientProperty.value will be set to a multiple of this value, in model coordinates
  interval?: number;

  // whether to skip zero value
  skipZero?: boolean;

  // whether to snap to zero when the drag ends
  snapToZero?: boolean;

  // Snap to zero when this close to zero. Ignored if snapToZero:false.
  // Must be >= options.interval, and defaults to options.interval
  snapToZeroEpsilon?: number;

  // model values where major tick marks will be placed
  tickValues?: number[] | null;

  // color of the label that appears above the slider
  labelColor?: TColor;

  // Propagated to VSlider. Note that the slider has a tandem, but the GQSlider (parent Node) does not.
  // See https://github.com/phetsims/graphing-quadratics/issues/208
  sliderOptions: PickOptional<VSliderOptions, 'phetioDocumentation'> & PickRequired<VSliderOptions, 'tandem'>;
};

export type GQSliderOptions = SelfOptions;

export default class GQSlider extends Node {

  /**
   * @param symbolStringProperty - the coefficient's symbol
   * @param coefficientProperty - the coefficient's value
   * @param [providedOptions]
   */
  protected constructor( symbolStringProperty: TReadOnlyProperty<string>, coefficientProperty: NumberProperty, providedOptions: GQSliderOptions ) {

    const options = optionize<GQSliderOptions, StrictOmit<SelfOptions, 'snapToZeroEpsilon'>, NodeOptions>()( {

      // SelfOptions
      map: IDENTITY_FUNCTION,
      inverseMap: IDENTITY_FUNCTION,
      interval: 1,
      skipZero: false,
      snapToZero: true,
      tickValues: DEFAULT_TICK_VALUES,
      labelColor: 'black'
    }, providedOptions );

    assert && assert( options.interval > 0, `invalid interval: ${options.interval}` );

    // default and validation for snapToZeroEpsilon
    let snapToZeroEpsilon: number;
    if ( options.snapToZero ) {
      if ( options.snapToZeroEpsilon === undefined ) {
        snapToZeroEpsilon = options.interval;
      }
      else {
        snapToZeroEpsilon = options.snapToZeroEpsilon;
      }
      assert && assert( ( snapToZeroEpsilon >= 0 ) && ( snapToZeroEpsilon >= options.interval ),
        `invalid snapToZeroEpsilon: ${snapToZeroEpsilon}` );
    }

    const sliderOptions = combineOptions<VSliderOptions>( {
      trackSize: TRACK_SIZE,
      thumbSize: THUMB_SIZE,
      thumbTouchAreaXDilation: 8,

      // Make tick mark lines extend past the thumb.
      majorTickLength: ( THUMB_SIZE.width / 2 ) + 3,

      // The slider controls an intermediate DynamicProperty, so link to the relevant model Property.
      phetioLinkedProperty: coefficientProperty,

      // apply constraints to the view value
      constrainValue: viewValue => {

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
      }
    }, options.sliderOptions );

    // Snap to zero when the drag ends.
    if ( !options.skipZero && options.snapToZero ) {
      sliderOptions.endDrag = () => {
        if ( ( Math.abs( coefficientProperty.value ) < snapToZeroEpsilon ) ) {
          coefficientProperty.value = 0;
        }
      };
    }

    // Map between model and view domains, determines how the slider responds.
    // Do not instrument for PhET-iO, see https://github.com/phetsims/phet-io/issues/1374
    const sliderProperty = new DynamicProperty( new Property( coefficientProperty ), {

      bidirectional: true,

      // map from model to view (coefficientProperty to sliderProperty)
      map: ( value: number ) => options.map( value ),

      // map from view to model (sliderProperty to coefficientProperty), apply options.interval to model value
      inverseMap: ( value: number ) => Utils.roundToInterval( options.inverseMap( value ), options.interval )
    } );

    // Convert the range from model to view
    const sliderRange = new Range(
      options.map( coefficientProperty.range.min ),
      options.map( coefficientProperty.range.max )
    );

    const slider = new VSlider( sliderProperty, sliderRange, sliderOptions );

    // Create the tick labels
    if ( options.tickValues ) {
      options.tickValues.forEach( tickValue => {
        slider.addMajorTick( options.map( tickValue ), new Text( tickValue, {
          font: GQConstants.SLIDER_TICK_LABEL_FONT
        } ) );
      } );
    }

    // Label that appears above the slider.
    const labelText = new RichText( symbolStringProperty, {
      visibleProperty: slider.visibleProperty, // For PhET-iO, label visibility is the same as slider visibility.
      font: GQConstants.SLIDER_LABEL_FONT,
      fill: options.labelColor,
      bottom: slider.top - 2,
      maxWidth: 20 // determined empirically
    } );
    labelText.boundsProperty.link( () => {
      labelText.centerX = 0; // keep the label horizontally centered on the track
    } );

    super( {
      children: [ slider, labelText ]
    } );
  }
}

graphingQuadratics.register( 'GQSlider', GQSlider );