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
  const VertexFormAccordionBox = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormAccordionBox' );
  const VertexFormGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphControls' );

  class VertexFormSceneNode extends GQSceneNode {

    /**
     * @param {VertexFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,
        new VertexFormAccordionBox( scene, viewProperties ),
        new VertexFormGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'VertexFormSceneNode', VertexFormSceneNode );
} );