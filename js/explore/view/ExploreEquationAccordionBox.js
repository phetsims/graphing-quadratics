// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/explore/view/ExploreInteractiveEquationNode' );
  const GQEquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/GQEquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const Tandem = require( 'TANDEM/Tandem' );

  class ExploreEquationAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {
                                              
      options = _.extend( {

        // phet-io
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'ExploreEquationAccordionBox sets titleNode' );
      options.titleNode = new StandardFormEquationNode( {
        maxWidth: 225, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the equation shown at the top of this accordion box'
      } );

      const content = new ExploreInteractiveEquationNode( model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'content' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'ExploreEquationAccordionBox', ExploreEquationAccordionBox );
} );