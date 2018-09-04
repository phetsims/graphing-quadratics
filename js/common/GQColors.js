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
    SAVED_CURVE: 'blue',
    QUADRATIC_TERM: 'hotpink',
    LINEAR_TERM: 'green',
    CONSTANT_TERM: 'black',
    FOCUS: 'green',
    DIRECTRIX: 'green',
    VERTEX: 'rgb( 128, 0, 128 )', // purple
    ROOTS: PhetColorScheme.RED_COLORBLIND,
    A_SYMBOL: 'green',
    INTERACTIVE_DIRECTRIX: PhetColorScheme.RED_COLORBLIND,
    SEPARATOR: 'rgb( 212, 212, 212 )',

    // alpha channel (0-1) of the halo around the various manipulators, manually tuned for above colors
    HALO_ALPHA: {
      slope: 0.3,
      intercept: 0.15,
      x1y1: 0.15,
      x2y2: 0.35,
      point: 0.15
    }
  };

  return graphingQuadratics.register( 'GQColors', GQColors );
} );
