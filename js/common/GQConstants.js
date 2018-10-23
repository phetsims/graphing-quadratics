// Copyright 2014-2018, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Range = require( 'DOT/Range' );

  // constants
  const PANEL_CORNER_RADIUS = 5; // corner radius for all panel-like containers

  const GQConstants = {

    SCREEN_VIEW_LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),
    SCREEN_VIEW_X_MARGIN: 20,
    SCREEN_VIEW_Y_MARGIN: 16,

    // range of the graph
    X_AXIS_RANGE: new Range( -10, 10 ),
    Y_AXIS_RANGE: new Range( -10, 10 ),

    // options applied to all AccordionBoxes
    ACCORDION_BOX_OPTIONS: {
      resize: false,
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      cornerRadius: PANEL_CORNER_RADIUS,
      titleYMargin: 10,
      buttonLength: 25,
      buttonXMargin: 10,
      buttonYMargin: 10,
      contentXMargin: 20,
      contentYMargin: 15
    },

    // options applied to all Panels
    PANEL_OPTIONS: {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      cornerRadius: PANEL_CORNER_RADIUS,
      xMargin: 20,
      yMargin: 15
    },

    // horizontal space between checkbox text and icon
    CHECKBOX_ICON_SPACING: 8,

    // maxWidth for all checkboxes, determined empirically
    CHECKBOX_TEXT_MAX_WIDTH: 180,

    // vertical space between checkboxes
    CHECKBOXES_Y_SPACING: 15,

    PICKER_TOUCH_AREA_X_DILATION: 30,

    // radius of manipulators, in model coordinates
    MANIPULATOR_RADIUS: 0.425,

    // radius of non-interactive points, in model coordinates
    POINT_RADIUS: 0.25,

    // font sizes
    TITLE_FONT_SIZE: 20,
    INTERACTIVE_EQUATION_FONT_SIZE: 26,
    SLIDER_TICK_LABEL_FONT_SIZE: 16,
    CHECKBOX_LABEL_FONT_SIZE: 20,
    CHECKBOX_EQUATION_FONT_SIZE: 22,
    GRAPH_EQUATION_FONT_SIZE: 18,

    // line widths
    INTERACTIVE_QUADRATIC_LINE_WIDTH: 4,
    SAVED_QUADRATIC_LINE_WIDTH: 3,
    QUADRATIC_TERMS_LINE_WIDTH: 2, // y = ax^2, y = bx, y = c
    AXIS_OF_SYMMETRY_LINE_WIDTH: 3,
    DIRECTRIX_LINE_WIDTH: 3,
    POINT_ON_PARABOLA_LINE_WIDTH: 3, // lines that connect point to focus and directrix

    // line dashes
    AXIS_OF_SYMMETRY_LINE_DASH: [ 5, 5 ],
    DIRECTRIX_LINE_DASH: [ 5, 5 ],
    POINT_ON_PARABOLA_LINE_DASH: [ 5, 5 ], // lines that connect point to focus and directrix

    // decimal places
    AXIS_OF_SYMMETRY_DECIMALS: 2,
    DIRECTRIX_DECIMALS: 2,
    FOCUS_DECIMALS: 2,
    POINT_ON_PARABOLA_DECIMALS: 2,
    POINT_TOOL_DECIMALS: 1,
    ROOTS_DECIMALS: 2,
    VERTEX_DECIMALS: 2,
    EXPLORE_DECIMALS_A: 2,
    EXPLORE_DECIMALS_B: 1,
    EXPLORE_DECIMALS_C: 1,
    FOCUS_AND_DIRECTRIX_DECIMALS_A: 3,
    FOCUS_AND_DIRECTRIX_DECIMALS_P: 1,
    FOCUS_AND_DIRECTRIX_DECIMALS_H: 1,
    FOCUS_AND_DIRECTRIX_DECIMALS_K: 1,

    // slider intervals
    EXPLORE_INTERVAL_A: 0.01,
    EXPLORE_INTERVAL_B: 0.1,
    EXPLORE_INTERVAL_C: 0.1,
    FOCUS_AND_DIRECTRIX_INTERVAL_P: 0.1,
    FOCUS_AND_DIRECTRIX_INTERVAL_H: 0.1,
    FOCUS_AND_DIRECTRIX_INTERVAL_K: 0.1,

    // enums
    EQUATION_FORMS: [ 'standard', 'vertex' ],

    // margins between equations and edges of graph
    // Caution! Changing these may cause an equation to go off the graph. Test thoroughly!
    EQUATION_X_MARGIN: 1.5, // distance between equation and left/right edges of graph, in model coordinate frame
    EQUATION_Y_MARGIN: 0.5, // distance between equation and top/bottom edges of graph, in model coordinate frame

    // space between equation and the curve that it labels, in view coordinate frame
    EQUATION_SPACING: 5,

    // maxWidth for all coordinates display (CoordinateNode instances)
    COORDINATES_MAX_WIDTH: 100
  };

  return graphingQuadratics.register( 'GQConstants', GQConstants );
} );
