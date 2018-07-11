// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model integer coefficients scene on the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );

  /**
   * @constructor
   */
  function IntegerCoefficientsScene() {
    GQScene.call( this );
  }

  graphingQuadratics.register( 'IntegerCoefficientsScene', IntegerCoefficientsScene );

  return inherit( GQScene, IntegerCoefficientsScene );
} );
