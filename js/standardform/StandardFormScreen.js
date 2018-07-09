// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );
  var StandardFormScreenView = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormScreenView' );

  // strings
  var screenStandardFormString = require( 'string!GRAPHING_QUADRATICS/screen.standardForm' );

  /**
   * @constructor
   */
  function StandardFormScreen() {

    var options = {
      name: screenStandardFormString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new StandardFormModel(); },
      function( model ) { return new StandardFormScreenView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );

  return inherit( Screen, StandardFormScreen );
} );
