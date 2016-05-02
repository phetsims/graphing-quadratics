// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for the 'Decimals' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  function DecimalsModel() {
  }

  graphingQuadratics.register( 'DecimalsModel', DecimalsModel );

  return inherit( Object, DecimalsModel, {

    reset: function() {
      //TODO
    }
  } );
} );
