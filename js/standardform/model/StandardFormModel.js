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

  /**
   * @constructor
   */
  function StandardFormModel() {

    // @public
    this.integerCoefficientsScene = new GQScene();
    this.decimalCoefficientsScene = new GQScene();

    GQModel.call( this, [ this.integerCoefficientsScene, this.decimalCoefficientsScene ] );
  }

  graphingQuadratics.register( 'StandardFormModel', StandardFormModel );

  return inherit( GQModel, StandardFormModel );
} );
