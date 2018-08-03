// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQIconFactory' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class StandardFormModel extends GQModel {

    constructor() {

      const decimalsScene = new GQScene();
      const integersScene = new GQScene();

      super( [ decimalsScene, integersScene  ] );

      // @public
      this.decimalsScene = decimalsScene;
      this.decimalsScene.icon = GQIconFactory.createDecimalsIcon();
      this.integersScene = integersScene;
      this.integersScene.icon = GQIconFactory.createIntegersIcon(); // TODO, maybe create another way to store icon
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
