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
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormAccordionBox extends EquationAccordionBox {

    /**
     * @param {StandardFormModel} model
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

      const content = new StandardFormInteractiveEquationNode( model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'content' )
      } );

      super( model, expandedProperty, titleNode, content, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormAccordionBox', StandardFormAccordionBox );
} );