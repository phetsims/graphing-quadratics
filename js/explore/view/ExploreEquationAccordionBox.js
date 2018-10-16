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
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'ExploreEquationAccordionBox sets titleNode' );
      options.titleNode = new StandardFormEquationNode( {
        maxWidth: 200, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' )
      } );

      const content = new ExploreInteractiveEquationNode( model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'content' )
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'ExploreEquationAccordionBox', ExploreEquationAccordionBox );
} );