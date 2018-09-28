// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreAccordionBox = require( 'GRAPHING_QUADRATICS/explore/view/ExploreAccordionBox' );
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
        tandem: tandem
      };

      const viewProperties = new ExploreViewProperties( {
        tandem: tandem.createTandem( 'viewProperties' )
      } );

      super( model,
        viewProperties,
        new ExploreGraphNode( model, viewProperties ),
        new ExploreAccordionBox( model, viewProperties.equationAccordionBoxExpandedProperty, {
          tandem: tandem.createTandem( 'equationAccordionBox' )
        } ),
        new QuadraticTermsAccordionBox( viewProperties, {
          tandem: tandem.createTandem( 'quadraticTermsAccordionBox' )
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
} );
