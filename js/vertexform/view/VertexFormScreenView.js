// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexGraphControls' );
  const VertexInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexInteractiveEquationNode' );

  class VertexFormScreenView extends GQScreenView{

    /**
     * @param {VertexFormModel} model
     */
    constructor( model ) {

      const vertexViewProperties = new GQViewProperties();

      super( model, [ vertexViewProperties ] );

      this.addChild( new GQSceneNode(
        model.vertexScene,
        this.layoutBounds,
        new VertexFormEquationNode(),
        new VertexInteractiveEquationNode( model.vertexScene.quadraticProperty ),
        new VertexGraphControls(
          vertexViewProperties.axisOfSymmetryVisibleProperty,
          vertexViewProperties.directrixVisibleProperty
        ),
        vertexViewProperties,
        { hasVertexManipulator: true }
      ) );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
} );
