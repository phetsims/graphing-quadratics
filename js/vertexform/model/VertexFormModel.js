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
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function VertexFormModel() {

    // @public
    this.vertexScene = new GQScene();
    
    GQModel.call( this, [ this.vertexScene ] );
  }

  graphingQuadratics.register( 'VertexFormModel', VertexFormModel );

  return inherit( GQModel, VertexFormModel );
} );
