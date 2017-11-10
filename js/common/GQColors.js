// Copyright 2014-2017, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  var GQColors = {
    SCREEN_BACKGROUND: 'rgb(238,252,252)',
    CONTROL_PANEL_BACKGROUND: 'rgb(255,255,226)'
  };

  graphingQuadratics.register( 'GQColors', GQColors );

  return GQColors;
} );
