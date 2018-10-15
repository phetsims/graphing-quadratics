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
  const GQScreenIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQScreenIconFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenExploreString = require( 'string!GRAPHING_QUADRATICS/screen.explore' );

  class ExploreScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {

        // Screen options
        name: screenExploreString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
        homeScreenIcon: GQScreenIconFactory.createExploreScreenIcon(),
        navigationBarIcon: GQScreenIconFactory.createExploreScreenIcon(), //TODO workaround for #51
        tandem: tandem
      };

      super(
        () => new ExploreModel( tandem.createTandem( 'model' ) ),
        model => new ExploreScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'ExploreScreen', ExploreScreen );
} );
