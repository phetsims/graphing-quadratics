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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenFocusAndDirectrixString = require( 'string!GRAPHING_QUADRATICS/screen.focusAndDirectrix' );

  class FocusAndDirectrixScreen extends Screen {

    constructor() {

      const options = {

        // superclass options
        name: screenFocusAndDirectrixString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
        //TODO #11 homeScreenIcon:
      };

      super(
        () => { return new FocusAndDirectrixModel(); },
        model => { return new FocusAndDirectrixScreenView( model ); },
        options
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreen', FocusAndDirectrixScreen );
} );
