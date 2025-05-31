// Copyright 2014-2025, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Quadratics' sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import ExploreScreen from './explore/ExploreScreen.js';
import FocusAndDirectrixScreen from './focusanddirectrix/FocusAndDirectrixScreen.js';
import GraphingQuadraticsStrings from './GraphingQuadraticsStrings.js';
import StandardFormScreen from './standardform/StandardFormScreen.js';
import VertexFormScreen from './vertexform/VertexFormScreen.js';

simLauncher.launch( () => {

  const titleStringProperty = GraphingQuadraticsStrings[ 'graphing-quadratics' ].titleStringProperty;

  const screens = [
    new ExploreScreen( Tandem.ROOT.createTandem( 'exploreScreen' ) ),
    new StandardFormScreen( Tandem.ROOT.createTandem( 'standardFormScreen' ) ),
    new VertexFormScreen( Tandem.ROOT.createTandem( 'vertexFormScreen' ) ),
    new FocusAndDirectrixScreen( Tandem.ROOT.createTandem( 'focusAndDirectrixScreen' ) )
  ];

  const options: SimOptions = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.), Andrea Lin',
      team: 'Mike Dubson, Karina K. R. Hensberry, Trish Loeblein, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Jaspe Arias, Steele Dalton, Jaron Droder, Clifford Hardin, Brooklyn Lash, Emily Miller, Laura Rea, Jacob Romero, Nancy Salpepi, Ethan Ward, Kathryn Woessner, Kelly Wurtz'
    },

    // phet-io options
    phetioDesigned: true
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );