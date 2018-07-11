// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model vertex scene on the 'Standard Form' screen.
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
  function VertexScene() {
    GQScene.call( this );
  }

  graphingQuadratics.register( 'VertexScene', VertexScene );

  return inherit( GQScene, VertexScene );
} );
