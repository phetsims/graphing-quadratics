// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import ExploreScreen from './explore/ExploreScreen.js';
import FocusAndDirectrixScreen from './focusanddirectrix/FocusAndDirectrixScreen.js';
import graphingQuadraticsStrings from './graphingQuadraticsStrings.js';
import StandardFormScreen from './standardform/StandardFormScreen.js';
import VertexFormScreen from './vertexform/VertexFormScreen.js';

const graphingQuadraticsTitleString = graphingQuadraticsStrings[ 'graphing-quadratics' ].title;

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