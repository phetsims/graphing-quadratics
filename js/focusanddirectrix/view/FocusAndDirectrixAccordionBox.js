// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const FocusAndDirectrixEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixEquationNode' );
  const FocusAndDirectrixInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixInteractiveEquationNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class FocusAndDirectrixAccordionBox extends EquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {BooleanProperty} expandedProperty
     * @param {Object} [options]
     */
    constructor( model, expandedProperty, options ) {

      const titleNode = new FocusAndDirectrixEquationNode();

      const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
        model.quadraticProperty, model.pRange, model.hRange, model.kRange );

      super( model, expandedProperty, titleNode, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixAccordionBox', FocusAndDirectrixAccordionBox );
} );