// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexSceneNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexSceneNode' );

  class VertexFormScreenView extends GQScreenView{

    /**
     * @param {VertexFormModel} model
     */
    constructor( model ) {

      const viewProperties = new GQViewProperties();

      super( model, [ viewProperties ] );

      this.addChild( new VertexSceneNode( model.scene, this.layoutBounds, viewProperties, {
        hasVertexManipulator: true
      } ) );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
} );
