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

    /**
     * @constructor
     */
    constructor() {

      const integersScene = new GQScene();
      const decimalsScene = new GQScene();

      super( [ integersScene, decimalsScene ] );

      // @public
      this.integersScene = integersScene;
      this.integersScene.icon = GQIconFactory.createIntegersIcon(); // TODO, maybe create another way to store icon
      this.decimalsScene = decimalsScene;
      this.decimalsScene.icon = GQIconFactory.createDecimalsIcon();
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
