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
  const TermsAccordionBox = require( 'GRAPHING_QUADRATICS/explore/view/TermsAccordionBox' );

  class ExploreScreenView extends GQScreenView {

    /**
     * @param {ExploreModel} model
     */
    constructor( model ) {

      const viewProperties = new ExploreViewProperties();

      super( model,
        viewProperties,
        new ExploreGraphNode( model, viewProperties ),
        new ExploreAccordionBox( model, viewProperties ),
        new TermsAccordionBox( viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
} );
