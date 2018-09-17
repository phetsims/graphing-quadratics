// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormScene = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormScene' );

  class StandardFormModel extends GQModel {

    constructor() {

      const scene = new StandardFormScene();

      super( [ scene  ] );

      // @public (read-only)
      this.scene = scene;
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
