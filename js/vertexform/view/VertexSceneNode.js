// Copyright 2018, University of Colorado Boulder

/**
 * View for the sole scene of the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexGraphControls' );
  const VertexInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexInteractiveEquationNode' );

  class VertexSceneNode extends GQSceneNode {

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
        new VertexInteractiveEquationNode( scene.quadraticProperty, scene.aRange, scene.hRange, scene.kRange ),

        // controls related to the graph
        new VertexGraphControls(
          viewProperties.axisOfSymmetryVisibleProperty,
          viewProperties.directrixVisibleProperty,
          viewProperties.hideCurvesProperty
        ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexSceneNode', VertexSceneNode );
} );