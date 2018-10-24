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

    // Point tools will snap ON to a curve when <= this distance from the curve, in model coordinates.
    // See https://github.com/phetsims/graphing-quadratics/issues/47
    // For internal use only, not public facing.
    snapOnDistance: {
      type: 'number',
      defaultValue: 0.5,
      isValidValue: function( value ) {
        return value > 0;
      }
    },

    // Point tools will snap OFF of a curve when > this distance from the curve, in model coordinates.
    // See https://github.com/phetsims/graphing-quadratics/issues/47
    // For internal use only, not public facing.
    snapOffDistance: {
      type: 'number',
      defaultValue: 2,
      isValidValue: function( value ) {
        return value > 0;
      }
    },
    
    // Distance that a point tool must be from a curve in order to register as being ON the curve, in model coordinates.
    // See https://github.com/phetsims/graphing-quadratics/issues/81
    // For internal use only, not public facing.
    pointToolThreshold: {
      type: 'number',
      defaultValue: 0.1,
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
