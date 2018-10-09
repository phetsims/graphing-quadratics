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

  class VertexFormAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'VertexFormAccordionBox sets titleNode' );
      options.titleNode = new VertexFormEquationNode( {
        maxWidth: 200, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' )
      } );

      const content = new VertexFormInteractiveEquationNode( model.aProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'content' )
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormAccordionBox', VertexFormAccordionBox );
} );