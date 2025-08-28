// Copyright 2025, University of Colorado Boulder

/**
 * GQScreenSummaryContent is the base class for all screen summaries.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';

export default class GQScreenSummaryContent extends ScreenSummaryContent {

  protected constructor( playAreaContent: TReadOnlyProperty<string>, graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {

    const currentDetailsContentProperty = new DerivedProperty( [
      graphContentsVisibleProperty,
      GraphingQuadraticsStrings.a11y.allScreens.screenSummary.currentDetailsStringProperty,
      GraphingQuadraticsStrings.a11y.allScreens.screenSummary.currentDetailsEmptyStringProperty
    ], ( graphContentsVisible, currentDetailsString, currentDetailsEmptyString ) =>
      graphContentsVisible ? currentDetailsString : currentDetailsEmptyString );

    super( {
      playAreaContent: playAreaContent,
      controlAreaContent: GraphingQuadraticsStrings.a11y.allScreens.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: GraphingQuadraticsStrings.a11y.allScreens.screenSummary.interactionHintStringProperty
    } );
  }
}

graphingQuadratics.register( 'GQScreenSummaryContent', GQScreenSummaryContent );