// Copyright 2002-2014, University of Colorado Boulder

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
  var title = require( 'string!GRAPHING_QUADRATICS/graphing-quadratics.name' );

  var screens = [ new IntegersScreen(), new DecimalsScreen(), new VertexFormScreen() ];

  var options = {
    credits: {
      leadDesign: 'Karina K. R. Hensberry',
      softwareDevelopment: 'Chris Malley',
      team: 'Mike Dubson, Patricia Loeblein, Ariel Paul, Kathy Perkins'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    options = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 0
    }, options );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( title, screens, options );
    sim.start();
  } );
} );