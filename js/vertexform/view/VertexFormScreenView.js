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
  const VertexFormGraphControls = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphControls' );
  const VertexFormGraphNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormGraphNode' );
  const VertexFormViewProperties = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormViewProperties' );

  class VertexFormScreenView extends GQScreenView {

    /**
     * @param {VertexFormModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const options = {
        tandem: tandem
      };

      const viewProperties = new VertexFormViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties' ),
        phetioDocumentation: 'Properties that are specific to the view for this screen'
      } );

      super( model,
        viewProperties,
        new VertexFormGraphNode( model, viewProperties, tandem ), //TODO #71 move tandem to options, add phetioDocumentation
        new VertexFormEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'the accordion box that contains the interactive equation for this screen'
        } ),
        new VertexFormGraphControls( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControls' ),
          phetioDocumentation: 'the panel that contains the graph controls for this screen'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
} );
