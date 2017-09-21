// Copyright 2014-2017, University of Colorado Boulder

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
  var IntegersScreenView = require( 'GRAPHING_QUADRATICS/integers/view/IntegersScreenView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var integersString = require( 'string!GRAPHING_QUADRATICS/integers' );

  /**
   * @constructor
   */
  function IntegersScreen() {

    var options = {
      name: integersString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
    };

    Screen.call( this,
      function() { return new IntegersModel(); },
      function( model ) { return new IntegersScreenView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'IntegersScreen', IntegersScreen );

  return inherit( Screen, IntegersScreen );
} );
