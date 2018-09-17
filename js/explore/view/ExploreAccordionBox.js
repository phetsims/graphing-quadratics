// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const ExploreInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/explore/view/ExploreInteractiveEquationNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );

  class ExploreAccordionBox extends EquationAccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      const titleNode = new StandardFormEquationNode();

      const interactiveEquationNode = new ExploreInteractiveEquationNode(
        model.quadraticProperty, model.aRange, model.bRange, model.cRange );

      super( model, viewProperties, titleNode, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'ExploreAccordionBox', ExploreAccordionBox );
} );