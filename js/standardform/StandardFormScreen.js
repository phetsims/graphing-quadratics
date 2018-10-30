// Copyright 2014-2018, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQScreenIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQScreenIconFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );
  const StandardFormScreenView = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormScreenView' );

  // strings
  const screenStandardFormString = require( 'string!GRAPHING_QUADRATICS/screen.standardForm' );

  class StandardFormScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {

        // Screen options
        name: screenStandardFormString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
        homeScreenIcon: GQScreenIconFactory.createStandardFormScreenIcon(),
        //TODO remove this workaround for https://github.com/phetsims/joist/issues/532
        navigationBarIcon: GQScreenIconFactory.createStandardFormScreenIcon(),
        tandem: tandem
      };

      super(
        () => new StandardFormModel( tandem.createTandem( 'model' ) ),
        model => new StandardFormScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );
} );
