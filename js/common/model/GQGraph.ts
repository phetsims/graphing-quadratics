// Copyright 2025, University of Colorado Boulder

/**
 * GQGraph is the model of a simple 2D graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';

export default class GQGraph extends Graph {

  public constructor( xRange: Range, yRange: Range ) {
    super( xRange, yRange );
  }
}

graphingQuadratics.register( 'GQGraph', GQGraph );