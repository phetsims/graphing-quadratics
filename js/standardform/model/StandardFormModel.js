// Copyright 2014-2018, University of Colorado Boulder

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

      const decimalsScene = new GQScene( { icon: GQIconFactory.createDecimalsIcon() } );
      const integersScene = new GQScene( { icon: GQIconFactory.createIntegersIcon() } );

      super( [ decimalsScene, integersScene  ] );

      // @public
      this.decimalsScene = decimalsScene;
      this.integersScene = integersScene;
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
