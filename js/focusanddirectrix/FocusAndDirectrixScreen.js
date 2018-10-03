// Copyright 2018, University of Colorado Boulder

/**
 * The 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixModel = require( 'GRAPHING_QUADRATICS/focusanddirectrix/model/FocusAndDirectrixModel' );
  const FocusAndDirectrixScreenView = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixScreenView' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQIconFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenFocusAndDirectrixString = require( 'string!GRAPHING_QUADRATICS/screen.focusAndDirectrix' );

  class FocusAndDirectrixScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {

        // superclass options
        name: screenFocusAndDirectrixString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
        homeScreenIcon: GQIconFactory.createFocusAndDirectrixScreenIcon(),
        tandem: tandem
      };

      super(
        () => new FocusAndDirectrixModel( tandem.createTandem( 'model' ) ),
        model => new FocusAndDirectrixScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreen', FocusAndDirectrixScreen );
} );
