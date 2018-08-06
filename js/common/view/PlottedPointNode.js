// Copyright 2018, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class PlottedPointNode extends Circle {

    /**
     * @param {number} radius
     * @param {Color|String} color
     * @param {Object} [options]
     */
    constructor( radius, color, options ) {

      options = _.extend( {

        // superclass options
        fill: color,
        stroke: color,
        lineWidth: 1
      }, options );

      //TODO assert that options fill and stroke are undefined, then assign constructor args

      super( radius, options );
    }
  }

  return graphingQuadratics.register( 'PlottedPointNode', PlottedPointNode );
} );
