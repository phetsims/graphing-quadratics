// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormScreenSummaryContent is the description screen summary for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import StandardFormModel from '../model/StandardFormModel.js';

export default class StandardFormScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: StandardFormModel ) {
    super( {
      playAreaContent: GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

graphingQuadratics.register( 'StandardFormScreenSummaryContent', StandardFormScreenSummaryContent );