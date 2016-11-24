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
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Screen = require( 'JOIST/Screen' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  // strings
  var decimalsString = require( 'string!GRAPHING_QUADRATICS/decimals' );

  /**
   * @constructor
   */
  function DecimalsScreen() {

    var options = {
      name: decimalsString,
      backgroundColorProperty: new Property( Color.toColor( GQColors.SCREEN_BACKGROUND ) )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new DecimalsModel(); },
      function( model ) { return new DecimalsView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'DecimalsScreen', DecimalsScreen );

  return inherit( Screen, DecimalsScreen );
} );
