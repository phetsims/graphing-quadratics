// Copyright 2018, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  var GQQueryParameters = QueryStringMachine.getAll( {

    // Checks all check boxes that would otherwise be unchecked by default.
    checkAll: { type: 'flag' }
  } );

  graphingQuadratics.register( 'GQQueryParameters', GQQueryParameters );

  return GQQueryParameters;
} );
