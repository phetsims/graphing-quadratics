// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreEquationAccordionBox = require( 'GRAPHING_QUADRATICS/explore/view/ExploreEquationAccordionBox' );
  const ExploreGraphNode = require( 'GRAPHING_QUADRATICS/explore/view/ExploreGraphNode' );
  const ExploreViewProperties = require( 'GRAPHING_QUADRATICS/explore/view/ExploreViewProperties' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const QuadraticTermsAccordionBox = require( 'GRAPHING_QUADRATICS/explore/view/QuadraticTermsAccordionBox' );

  class ExploreScreenView extends GQScreenView {

    /**
     * @param {ExploreModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const options = {

        // phet-io
        tandem: tandem
      };

      const viewProperties = new ExploreViewProperties( {
        tandem: tandem.createTandem( 'viewProperties' )
      } );

      super( model,
        viewProperties,
        new ExploreGraphNode( model, viewProperties ), // do not instrument for PhET-iO
        new ExploreEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'accordion box that contains the interactive equation'
        } ),
        new QuadraticTermsAccordionBox( viewProperties, {
          expandedProperty: viewProperties.quadraticTermsAccordionBoxExpandedProperty,
          tandem: tandem.createTandem( 'quadraticTermsAccordionBox' ),
          phetioDocumentation: 'the Quadratic Terms accordion box'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
} );
