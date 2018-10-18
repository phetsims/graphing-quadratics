// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQEquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/GQEquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormInteractiveEquationNode' );

  class VertexFormEquationAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'VertexFormEquationAccordionBox sets titleNode' );
      options.titleNode = new VertexFormEquationNode( {
        maxWidth: 200, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the equation shown at the top of this accordion box'
      } );

      const content = new VertexFormInteractiveEquationNode( model.aProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'content' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormEquationAccordionBox', VertexFormEquationAccordionBox );
} );