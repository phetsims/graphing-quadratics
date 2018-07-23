// Copyright 2013-2015, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Circle = require( 'SCENERY/nodes/Circle' );

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   * @constructor
   */
  function PlottedPointNode( radius, color, options ) {

    options = _.extend( {
      fill: color,
      stroke: color,
      lineWidth: 1
    }, options );

    Circle.call( this, radius, options );
  }

  graphingQuadratics.register( 'PlottedPointNode', PlottedPointNode );

  return inherit( Circle, PlottedPointNode );
} );