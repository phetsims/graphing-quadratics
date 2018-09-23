// Copyright 2014-2018, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  // common colors
  const VERTEX = 'rgb( 128, 0, 128 )'; // purple
  const FOCUS = 'green';

  const GQColors = {

    // interactive curves in each screen
    EXPLORE_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
    STANDARD_FORM_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
    VERTEX_FORM_INTERACTIVE_CURVE: 'black',
    FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE: 'black',

    // quadratic terms on the Explore screen
    QUADRATIC_TERM: 'blue',
    LINEAR_TERM: 'green',
    CONSTANT_TERM: 'magenta',

    // Coefficients on the Explore screen
    EXPLORE_A: PhetColorScheme.RED_COLORBLIND,
    EXPLORE_B: PhetColorScheme.RED_COLORBLIND,
    EXPLORE_C: PhetColorScheme.RED_COLORBLIND,

    // Coefficients on the Standard Form screen
    STANDARD_FORM_A: PhetColorScheme.RED_COLORBLIND,
    STANDARD_FORM_B: PhetColorScheme.RED_COLORBLIND,
    STANDARD_FORM_C: PhetColorScheme.RED_COLORBLIND,

    // Coefficients on the Vertex Form screen
    VERTEX_FORM_A: 'green', //TODO #29 there is nothing else that is green on the Vertex Form screen
    VERTEX_FORM_H: VERTEX,
    VERTEX_FORM_K: VERTEX,

    // Coefficients on the Focus & Directrix screen
    FOCUS_AND_DIRECTRIX_P: FOCUS,
    FOCUS_AND_DIRECTRIX_H: VERTEX,
    FOCUS_AND_DIRECTRIX_K: VERTEX,

    // common to all screens
    SCREEN_BACKGROUND: 'rgb( 238, 252, 252 )',
    CONTROL_PANEL_BACKGROUND: 'rgb( 238, 238, 238 )',
    SAVED_CURVE: 'rgb( 160, 160, 160 )',
    FOCUS: FOCUS,
    DIRECTRIX: 'green',
    VERTEX: VERTEX,
    AXIS_OF_SYMMETRY: VERTEX,
    ROOTS: PhetColorScheme.RED_COLORBLIND,
    POINT_ON_QUADRATIC: PhetColorScheme.RED_COLORBLIND,
    SEPARATOR: 'rgb( 212, 212, 212 )',

    // transparency of all manipulator halos, which appear on pointer over
    MANIPULATOR_HALO_ALPHA: 0.15
  };

  return graphingQuadratics.register( 'GQColors', GQColors );
} );
