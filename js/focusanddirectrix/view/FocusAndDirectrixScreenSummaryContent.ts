// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixScreenSummaryContent is the description screen summary for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GQScreenSummaryContent from '../../common/view/GQScreenSummaryContent.js';

export default class FocusAndDirectrixScreenSummaryContent extends GQScreenSummaryContent {

  public constructor( graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {
    super( GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.playAreaStringProperty, graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreenSummaryContent', FocusAndDirectrixScreenSummaryContent );