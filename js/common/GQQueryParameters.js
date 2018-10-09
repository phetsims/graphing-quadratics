// Copyright 2018, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  const GQQueryParameters = QueryStringMachine.getAll( {

    // Checks all check boxes that would otherwise be unchecked by default.
    // For internal use only, not public facing.
    checkAll: { type: 'flag' },

    // Point tool will snap to a line when <= this distance from the line, in model coordinates.
    // For internal use only, not public facing.
    snapDistance: {
      type: 'number',
      defaultValue: 0.5,
      isValidValue: function( value ) {
        return value > 0;
      }
    },

    //TODO delete this after we decide whether to snap to grid
    // Causes the point tool to snap to the graph's grid when it doesn't snap to a line.
    // For internal use only, not public facing.
    snapToGrid: {
      type: 'boolean',
      defaultValue: true
    }

  } );

  graphingQuadratics.register( 'GQQueryParameters', GQQueryParameters );

  return GQQueryParameters;
} );
