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
  const ExploreGraphControls = require( 'GRAPHING_QUADRATICS/explore/view/ExploreGraphControls' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class ExploreScreenView extends GQScreenView {

    /**
     * @param {ExploreModel} model
     */
    constructor( model ) {

      const viewProperties = new GQViewProperties();

      super( model,
        viewProperties,
        new ExploreAccordionBox( model, viewProperties ),
        new ExploreGraphControls( viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
} );