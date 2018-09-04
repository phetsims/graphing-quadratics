// Copyright 2014-2018, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  const GQColors = {
    SCREEN_BACKGROUND: 'rgb( 238, 252, 252 )',
    CONTROL_PANEL_BACKGROUND: 'rgb( 238, 238, 238 )',
    INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
    SAVED_CURVE: 'rgb( 160, 160, 160 )',
    QUADRATIC_TERM: 'hotpink',
    LINEAR_TERM: 'green',
    CONSTANT_TERM: 'black',
    FOCUS: 'green',
    DIRECTRIX: 'green',
    VERTEX: 'rgb( 128, 0, 128 )', // purple
    ROOTS: PhetColorScheme.RED_COLORBLIND,
    A_SYMBOL: 'green',
    VERTEX_MANIPULATOR_HALO_ALPHA: 0.15
  };

  return graphingQuadratics.register( 'GQColors', GQColors );
} );
