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
  const VertexFormEquationAccordionBox = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationAccordionBox' );
  const VertexFormGraphControlPanel = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphControlPanel' );
  const VertexFormGraphNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphNode' );
  const VertexFormViewProperties = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormViewProperties' );

  class VertexFormScreenView extends GQScreenView {

    /**
     * @param {VertexFormModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const options = {

        // phet-io
        tandem: tandem
      };

      const viewProperties = new VertexFormViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties' )
      } );

      super( model,
        viewProperties,
        new VertexFormGraphNode( model, viewProperties, tandem ),
        new VertexFormEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'accordion box that contains the interactive equation'
        } ),
        new VertexFormGraphControlPanel( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControlPanel' ),
          phetioDocumentation: 'panel that contains controls related to the graph'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
} );
