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
  var inherit = require( 'PHET_CORE/inherit' );
  var IntegersModel = require( 'GRAPHING_QUADRATICS/integers/model/IntegersModel' );
  var IntegersView = require( 'GRAPHING_QUADRATICS/integers/view/IntegersView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var integersString = require( 'string!GRAPHING_QUADRATICS/integers' );

  var createIcon = function() {
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'red' } ); //TODO
  };

  function IntegersScreen() {
    Screen.call( this,
      integersString,
      createIcon(),
      function() { return new IntegersModel(); },
      function( model ) { return new IntegersView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColor: GQColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, IntegersScreen );
} );
