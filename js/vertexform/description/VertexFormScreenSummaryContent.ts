// Copyright 2025, University of Colorado Boulder

/**
 * VertexFormScreenSummaryContent is the description screen summary for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import GQScreenSummaryContent from '../../common/description/GQScreenSummaryContent.js';

export default class VertexFormScreenSummaryContent extends GQScreenSummaryContent {

  public constructor( graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {
    super( GraphingQuadraticsStrings.a11y.standardFormScreen.screenSummary.playAreaStringProperty, graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'VertexFormScreenSummaryContent', VertexFormScreenSummaryContent );