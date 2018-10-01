// Copyright 2018, University of Colorado Boulder

/**
 * Model of a simple 2D graph that displays quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ObservableArray = require( 'AXON/ObservableArray' );

  class GQGraph extends Graph {

    /**
     * @param {Range} xRange
     * @param {Range} yRange
     */
    constructor( xRange, yRange ) {

      super( xRange, yRange );

      // @public {ObservableArray.<Quadratic>} quadratics that are visible on the graph
      // These should be ordered in reverse rendering order so that the point tools prefer quadratics in foreground.
      this.quadratics = new ObservableArray();
    }
  }

  return graphingQuadratics.register( 'GQGraph', GQGraph );
} );