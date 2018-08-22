// Copyright 2018, University of Colorado Boulder

/**
 * View for the sole scene of the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexFormGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphControls' );
  const VertexFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormInteractiveEquationNode' );

  class VertexFormSceneNode extends GQSceneNode {

    /**
     * @param {VertexFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,

        // standard form of the equation, title of accordion box
        new VertexFormEquationNode(),

        // interactive equation, in the accordion box
        new VertexFormInteractiveEquationNode( scene.quadraticProperty, scene.aRange, scene.hRange, scene.kRange ),

        // controls related to the graph
        new VertexFormGraphControls( viewProperties ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexFormSceneNode', VertexFormSceneNode );
} );