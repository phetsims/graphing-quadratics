// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function StandardFormModel() {
  }

  graphingQuadratics.register( 'StandardFormModel', StandardFormModel );

  return inherit( Object, StandardFormModel, {

    reset: function() {
      //TODO
    }
  } );
} );
