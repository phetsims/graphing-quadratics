// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexFormAccordionBox = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormAccordionBox' );
  const VertexFormGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphControls' );
  const VertexFormGraphNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphNode' );
  const VertexFormViewProperties = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormViewProperties' );

  class VertexFormScreenView extends GQScreenView {

    /**
     * @param {VertexFormModel} model
     */
    constructor( model ) {

      const viewProperties = new VertexFormViewProperties();

      super( model,
        viewProperties,
        new VertexFormGraphNode( model, viewProperties ),
        new VertexFormAccordionBox( model, viewProperties ),
        new VertexFormGraphControls( viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
} );
