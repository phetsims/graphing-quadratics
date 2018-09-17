// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreSceneNode = require( 'GRAPHING_QUADRATICS/explore/view/ExploreSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class ExploreScreenView extends GQScreenView {

    /**
     * @param {ExploreModel} model
     */
    constructor( model ) {

      const viewProperties = new GQViewProperties();

      super( model, [ viewProperties ] );

      this.addChild( new ExploreSceneNode( model.scene, this.layoutBounds, viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
} );
