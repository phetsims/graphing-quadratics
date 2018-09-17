// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreScene = require( 'GRAPHING_QUADRATICS/explore/model/ExploreScene' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class ExploreModel extends GQModel {

    constructor() {

      const scene = new ExploreScene();

      super( [ scene  ] );

      // @public (read-only)
      this.scene = scene;
    }
  }

  return graphingQuadratics.register( 'ExploreModel', ExploreModel );
} );
