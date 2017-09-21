// Copyright 2014-2016, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  function VertexFormModel() {
  }

  graphingQuadratics.register( 'VertexFormModel', VertexFormModel );

  return inherit( Object, VertexFormModel, {

    reset: function() {
      //TODO
    }
  } );
} );
