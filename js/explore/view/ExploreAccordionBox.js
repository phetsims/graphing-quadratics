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
  const Tandem = require( 'TANDEM/Tandem' );

  class ExploreAccordionBox extends EquationAccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {BooleanProperty} expandedProperty
     * @param {Object} [options]
     */
    constructor( model, expandedProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const titleNode = new StandardFormEquationNode( {
        tandem: options.tandem.createTandem( 'titleNode' )
      } );

      const interactiveEquationNode = new ExploreInteractiveEquationNode(
        model.quadraticProperty, model.aRange, model.bRange, model.cRange );

      super( model, expandedProperty, titleNode, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'ExploreAccordionBox', ExploreAccordionBox );
} );