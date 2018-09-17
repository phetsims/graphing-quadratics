// Copyright 2018, University of Colorado Boulder

/**
 * The 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreModel = require( 'GRAPHING_QUADRATICS/explore/model/ExploreModel' );
  const ExploreScreenView = require( 'GRAPHING_QUADRATICS/explore/view/ExploreScreenView' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenExploreString = require( 'string!GRAPHING_QUADRATICS/screen.explore' );

  class ExploreScreen extends Screen {

    constructor() {

      const options = {

        // superclass options
        name: screenExploreString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
        //TODO #11 homeScreenIcon:
      };

      super(
        () => { return new ExploreModel(); },
        model => { return new ExploreScreenView( model ); },
        options
      );
    }
  }

  return graphingQuadratics.register( 'ExploreScreen', ExploreScreen );
} );
