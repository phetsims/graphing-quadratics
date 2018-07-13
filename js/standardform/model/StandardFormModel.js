// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );
  var GQIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQIconFactory' );

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
