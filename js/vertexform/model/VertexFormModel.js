// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function VertexFormModel() {
    GQModel.call( this );
  }

  graphingQuadratics.register( 'VertexFormModel', VertexFormModel );

  return inherit( GQModel, VertexFormModel );
} );
