// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreScreen = require( 'GRAPHING_QUADRATICS/explore/ExploreScreen' );
  const FocusAndDirectrixScreen = require( 'GRAPHING_QUADRATICS/focusanddirectrix/FocusAndDirectrixScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const StandardFormScreen = require( 'GRAPHING_QUADRATICS/standardform/StandardFormScreen' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VertexFormScreen = require( 'GRAPHING_QUADRATICS/vertexform/VertexFormScreen' );

  // strings
  const graphingQuadraticsTitleString = require( 'string!GRAPHING_QUADRATICS/graphing-quadratics.title' );

  const options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.), Andrea Lin',
      team: 'Mike Dubson, Karina K. R. Hensberry, Trish Loeblein, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Jaspe Arias, Steele Dalton, Laura Rea, Jacob Romero, Ethan Ward, Kathryn Woessner, Kelly Wurtz'
    }
  };

  SimLauncher.launch( () => {
    const screens = [
      new ExploreScreen( Tandem.ROOT.createTandem( 'exploreScreen' ) ),
      new StandardFormScreen( Tandem.ROOT.createTandem( 'standardFormScreen' ) ),
      new VertexFormScreen( Tandem.ROOT.createTandem( 'vertexFormScreen' ) ),
      new FocusAndDirectrixScreen( Tandem.ROOT.createTandem( 'focusAndDirectrixScreen' ) )
    ];
    const sim = new Sim( graphingQuadraticsTitleString, screens, options );
    sim.start();
  } );
} );