// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixScreenSummaryContent is the description screen summary for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import GQScreenSummaryContent from '../../common/view/description/GQScreenSummaryContent.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

export default class FocusAndDirectrixScreenSummaryContent extends GQScreenSummaryContent {

  public constructor( graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {

    const playAreaStringProperty = new PatternStringProperty( GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenSummary.playAreaStringProperty, {
      equation: GraphingQuadraticsStrings.a11y.focusAndDirectrixFormEquationStringProperty
    } );

    super( playAreaStringProperty, graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreenSummaryContent', FocusAndDirectrixScreenSummaryContent );