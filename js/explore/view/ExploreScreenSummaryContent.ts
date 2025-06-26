// Copyright 2025, University of Colorado Boulder

/**
 * ExploreScreenSummaryContent is the description screen summary for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import ExploreModel from '../model/ExploreModel.js';

export default class ExploreScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: ExploreModel ) {
    super( {
      playAreaContent: GraphingQuadraticsStrings.a11y.exploreScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: GraphingQuadraticsStrings.a11y.exploreScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: GraphingQuadraticsStrings.a11y.exploreScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: GraphingQuadraticsStrings.a11y.exploreScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

graphingQuadratics.register( 'ExploreScreenSummaryContent', ExploreScreenSummaryContent );