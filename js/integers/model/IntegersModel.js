// Copyright 2014-2016, University of Colorado Boulder

/**
 * Model for the 'Integers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  function IntegersModel() {
  }

  graphingQuadratics.register( 'IntegersModel', IntegersModel );

  return inherit( Object, IntegersModel, {

    reset: function() {
      //TODO
    }
  } );
} );
