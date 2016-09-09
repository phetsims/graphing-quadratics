// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'Integers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntegersModel = require( 'GRAPHING_QUADRATICS/integers/model/IntegersModel' );
  var IntegersView = require( 'GRAPHING_QUADRATICS/integers/view/IntegersView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var integersString = require( 'string!GRAPHING_QUADRATICS/integers' );

  /**
   * @constructor
   */
  function IntegersScreen() {

    var options = {
      name: integersString,
      backgroundColor: GQColors.SCREEN_BACKGROUND
    };

    Screen.call( this,
      function() { return new IntegersModel(); },
      function( model ) { return new IntegersView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'IntegersScreen', IntegersScreen );

  return inherit( Screen, IntegersScreen );
} );
