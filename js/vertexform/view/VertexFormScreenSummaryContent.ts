// Copyright 2025, University of Colorado Boulder

/**
 * VertexFormScreenSummaryContent is the description screen summary for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import VertexFormModel from '../model/VertexFormModel.js';

export default class VertexFormScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: VertexFormModel ) {
    super( {
      playAreaContent: GraphingQuadraticsStrings.a11y.vertexFormScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: GraphingQuadraticsStrings.a11y.vertexFormScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: GraphingQuadraticsStrings.a11y.vertexFormScreen.screenSummary.currentDetailsStringProperty,
      interactionHintContent: GraphingQuadraticsStrings.a11y.vertexFormScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

graphingQuadratics.register( 'VertexFormScreenSummaryContent', VertexFormScreenSummaryContent );