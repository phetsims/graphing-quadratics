// Copyright 2025-2026, University of Colorado Boulder

/**
 * GQGraph is the model of a simple 2D graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';

export default class GQGraph extends Graph {

  public constructor( xRange: Range, yRange: Range ) {
    super( xRange, yRange );
  }
}
