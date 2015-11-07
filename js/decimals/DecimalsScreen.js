// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'Decimals' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DecimalsModel = require( 'GRAPHING_QUADRATICS/decimals/model/DecimalsModel' );
  var DecimalsView = require( 'GRAPHING_QUADRATICS/decimals/view/DecimalsView' );
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var decimalsString = require( 'string!GRAPHING_QUADRATICS/decimals' );

  var createIcon = function() {
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'yellow' } ); //TODO
  };

  function DecimalsScreen() {
    Screen.call( this,
      decimalsString,
      createIcon(),
      function() { return new DecimalsModel(); },
      function( model ) { return new DecimalsView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColor: GQColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, DecimalsScreen );
} );
