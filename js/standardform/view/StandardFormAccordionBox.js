// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const StandardFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormInteractiveEquationNode' );

  class StandardFormAccordionBox extends EquationAccordionBox {

    /**
     * @param {StandardFormModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      const titleNode = new StandardFormEquationNode();

      const interactiveEquationNode = new StandardFormInteractiveEquationNode(
        model.quadraticProperty, model.aRange, model.bRange, model.cRange );

      super( model, viewProperties, titleNode, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormAccordionBox', StandardFormAccordionBox );
} );