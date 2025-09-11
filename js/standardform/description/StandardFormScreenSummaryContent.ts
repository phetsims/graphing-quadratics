// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormScreenSummaryContent is the description screen summary for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import GQScreenSummaryContent from '../../common/view/description/GQScreenSummaryContent.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

export default class StandardFormScreenSummaryContent extends GQScreenSummaryContent {

  public constructor( graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {

    const playAreaStringProperty = new PatternStringProperty( GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.playAreaStringProperty, {
      equation: GraphingQuadraticsStrings.a11y.standardFormEquationStringProperty
    } );

    super( playAreaStringProperty, graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'StandardFormScreenSummaryContent', StandardFormScreenSummaryContent );