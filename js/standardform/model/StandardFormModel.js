// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const GQIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQIconFactory' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormScene = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormScene' );

  class StandardFormModel extends GQModel {

    constructor() {

      const decimalsScene = new StandardFormScene( GQIconFactory.createDecimalsIcon() );
      const integersScene = new StandardFormScene( GQIconFactory.createIntegersIcon() );

      super( [ decimalsScene, integersScene  ] );

      // @public (read-only)
      this.decimalsScene = decimalsScene;
      this.integersScene = integersScene;
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
