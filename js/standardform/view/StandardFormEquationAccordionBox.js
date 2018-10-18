// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQEquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/GQEquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const StandardFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormInteractiveEquationNode' );
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormEquationAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {StandardFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'StandardFormEquationAccordionBox sets titleNode' );
      options.titleNode = new StandardFormEquationNode( {
        maxWidth: 200, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the equation shown at the top of this accordion box'
      } );

      const content = new StandardFormInteractiveEquationNode( model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'content' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormEquationAccordionBox', StandardFormEquationAccordionBox );
} );