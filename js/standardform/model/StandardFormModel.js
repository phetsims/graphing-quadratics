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
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function StandardFormModel() {

    // @public
    this.integersScene = new GQScene();
    this.integersScene.icon = GQIconFactory.createIntegersIcon();
    this.decimalsScene = new GQScene();
    this.decimalsScene.icon = GQIconFactory.createDecimalsIcon();

    GQModel.call( this, [ this.integersScene, this.decimalsScene ] );
  }

  graphingQuadratics.register( 'StandardFormModel', StandardFormModel );

  return inherit( GQModel, StandardFormModel );
} );
