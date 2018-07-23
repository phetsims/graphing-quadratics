// Copyright 2014-2017, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  const GQColors = {
    SCREEN_BACKGROUND: 'rgb( 238, 252, 252 )',
    CONTROL_PANEL_BACKGROUND: 'rgb( 238, 238, 238 )',
    ACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
    SAVED_CURVE: 'blue',
    QUADRATIC_TERM: 'hotpink',
    LINEAR_TERM: 'green',
    CONSTANT_TERM: 'black',
    DIRECTRIX: 'green',
    VERTEX: 'purple',
    ROOTS: PhetColorScheme.RED_COLORBLIND,
    A_SYMBOL: 'green',
    INTERACTIVE_DIRECTRIX: PhetColorScheme.RED_COLORBLIND
  };

  graphingQuadratics.register( 'GQColors', GQColors );

  return GQColors;
} );
