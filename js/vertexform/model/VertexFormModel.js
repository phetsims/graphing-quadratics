// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexFormScene = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormScene' );

  class VertexFormModel extends GQModel {

    constructor() {
      const vertexScene = new VertexFormScene();
      super( [ vertexScene ] );
      this.scene = vertexScene; // @public (read-only)
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
