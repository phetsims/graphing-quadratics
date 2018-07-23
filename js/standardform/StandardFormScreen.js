// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );
  const StandardFormScreenView = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormScreenView' );

  // strings
  const screenStandardFormString = require( 'string!GRAPHING_QUADRATICS/screen.standardForm' );

  /**
   * @constructor
   */
  function StandardFormScreen() {

    const options = {
      name: screenStandardFormString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new StandardFormModel(); },
      function( model ) { return new StandardFormScreenView( model ); },
      options
    );
  }

  graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );

  return inherit( Screen, StandardFormScreen );
} );
