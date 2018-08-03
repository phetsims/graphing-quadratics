// Copyright 2014-2018, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const StandardFormScreen = require( 'GRAPHING_QUADRATICS/standardform/StandardFormScreen' );
  const VertexFormScreen = require( 'GRAPHING_QUADRATICS/vertexform/VertexFormScreen' );

  // strings
  const graphingQuadraticsTitleString = require( 'string!GRAPHING_QUADRATICS/graphing-quadratics.title' );

  const options = {
    credits: {
      //TODO
    }
  };

  SimLauncher.launch( function() {
    const screens = [
      new StandardFormScreen(),
      new VertexFormScreen()
    ];
    const sim = new Sim( graphingQuadraticsTitleString, screens, options );
    sim.start();
  } );
} );