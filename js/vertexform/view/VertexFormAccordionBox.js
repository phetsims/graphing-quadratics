// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormInteractiveEquationNode' );

  class VertexFormAccordionBox extends EquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {BooleanProperty} expandedProperty
     * @param {Object} [options]
     */
    constructor( model, expandedProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const titleNode = new VertexFormEquationNode();

      const interactiveEquationNode = new VertexFormInteractiveEquationNode(
        model.quadraticProperty, model.aRange, model.hRange, model.kRange );

      super( model, expandedProperty, titleNode, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormAccordionBox', VertexFormAccordionBox );
} );