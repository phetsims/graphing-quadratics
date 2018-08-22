// Copyright 2014-2018, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );
  const StandardFormScreenView = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormScreenView' );

  // strings
  const screenStandardFormString = require( 'string!GRAPHING_QUADRATICS/screen.standardForm' );

  class StandardFormScreen extends Screen {

    constructor() {

      const options = {

        // superclass options
        name: screenStandardFormString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
        //TODO #11 homeScreenIcon:
      };

      super(
        () => { return new StandardFormModel(); },
        model => { return new StandardFormScreenView( model ); },
        options
      );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );
} );
