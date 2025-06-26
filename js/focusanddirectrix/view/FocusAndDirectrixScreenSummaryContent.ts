// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixScreenSummaryContent is the description screen summary for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import FocusAndDirectrixModel from '../model/FocusAndDirectrixModel.js';

export default class FocusAndDirectrixScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: FocusAndDirectrixModel ) {
    super( {
      playAreaContent: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreenSummaryContent', FocusAndDirectrixScreenSummaryContent );