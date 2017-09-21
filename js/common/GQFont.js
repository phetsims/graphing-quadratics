// Copyright 2014-2016, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * @param {number|*} options font size or font options
   * @constructor
   */
  function GQFont( options ) {

    // convenience for specifying font size only, e.g. new GQFont(24)
    if ( typeof options === 'number' ) {
      options = { size: options };
    }

    // font attributes, as specified in the design document
    options = _.extend( {
      family: 'Tahoma'
    }, options );

    PhetFont.call( this, options );
  }

  graphingQuadratics.register( 'GQFont', GQFont );

  return inherit( PhetFont, GQFont );
} );
