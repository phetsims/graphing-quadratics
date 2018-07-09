// Copyright 2014-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var StandardFormScreen = require( 'GRAPHING_QUADRATICS/standardform/StandardFormScreen' );
  var VertexFormScreen = require( 'GRAPHING_QUADRATICS/vertexform/VertexFormScreen' );

  // strings
  var graphingQuadraticsTitleString = require( 'string!GRAPHING_QUADRATICS/graphing-quadratics.title' );

  var options = {
    credits: {
      //TODO
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new StandardFormScreen(),
      new VertexFormScreen()
    ];
    var sim = new Sim( graphingQuadraticsTitleString, screens, options );
    sim.start();
  } );
} );