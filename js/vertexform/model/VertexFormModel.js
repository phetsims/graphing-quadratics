// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class VertexFormModel extends GQModel {

    constructor() {

      const vertexScene = new GQScene();

      super( [ vertexScene ] );

      // @public
      this.vertexScene = vertexScene;
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
