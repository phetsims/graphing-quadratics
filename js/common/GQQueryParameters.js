// Copyright 2018, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * Running with ?log will print these query parameters and their values to the console,
 * as well as changes to selective model Properties.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  const GQQueryParameters = QueryStringMachine.getAll( {

    // Checks all check boxes that would otherwise be unchecked by default.
    // For internal use only, not public facing.
    checkAll: { type: 'flag' },

    // Point tool will snap to a curve when <= this distance from the curve, in model coordinates.
    // For internal use only, not public facing.
    snapDistance: {
      type: 'number',
      defaultValue: 0.5,
      isValidValue: function( value ) {
        return value > 0;
      }
    }
  } );

  graphingQuadratics.register( 'GQQueryParameters', GQQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( GQQueryParameters, null, 2 ) );

  return GQQueryParameters;
} );
