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
  var DecimalsScreenView = require( 'GRAPHING_QUADRATICS/decimals/view/DecimalsScreenView' );
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var decimalsString = require( 'string!GRAPHING_QUADRATICS/decimals' );

  /**
   * @constructor
   */
  function DecimalsScreen() {

    var options = {
      name: decimalsString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new DecimalsModel(); },
      function( model ) { return new DecimalsScreenView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'DecimalsScreen', DecimalsScreen );

  return inherit( Screen, DecimalsScreen );
} );
