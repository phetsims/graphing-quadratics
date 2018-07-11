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
  var IntegerCoefficientsScene = require( 'GRAPHING_QUADRATICS/standardform/model/IntegerCoefficientsScene' );
  var DecimalCoefficientsScene = require( 'GRAPHING_QUADRATICS/standardform/model/DecimalCoefficientsScene' );

  /**
   * @constructor
   */
  function StandardFormModel() {

    // @public
    this.integerCoefficientsScene = new IntegerCoefficientsScene();
    this.decimalCoefficientsScene = new DecimalCoefficientsScene();

    GQModel.call( this, [ this.integerCoefficientsScene, this.decimalCoefficientsScene ] );
  }

  graphingQuadratics.register( 'StandardFormModel', StandardFormModel );

  return inherit( GQModel, StandardFormModel );
} );
