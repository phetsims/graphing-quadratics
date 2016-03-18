// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DecimalsScreen = require( 'GRAPHING_QUADRATICS/decimals/DecimalsScreen' );
  var IntegersScreen = require( 'GRAPHING_QUADRATICS/integers/IntegersScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var VertexFormScreen = require( 'GRAPHING_QUADRATICS/vertexform/VertexFormScreen' );

  // strings
  var graphingQuadraticsTitleString = require( 'string!GRAPHING_QUADRATICS/graphing-quadratics.title' );

  var options = {
    credits: {
      leadDesign: 'Karina K. R. Hensberry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Mike Dubson, Patricia Loeblein, Ariel Paul, Kathy Perkins'
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new IntegersScreen(),
      new DecimalsScreen(),
      new VertexFormScreen()
    ];
    var sim = new Sim( graphingQuadraticsTitleString, screens, options );
    sim.start();
  } );
} );