// Copyright 2014-2018, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const PANEL_CORNER_RADIUS = 5;

  const GQConstants = {

    SCREEN_VIEW_LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),
    SCREEN_VIEW_X_MARGIN: 20,
    SCREEN_VIEW_Y_MARGIN: 16,
    X_AXIS_RANGE: new RangeWithValue( -10, 10 ),
    Y_AXIS_RANGE: new RangeWithValue( -10, 10 ),

    ACCORDION_BOX_OPTIONS: {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      cornerRadius: PANEL_CORNER_RADIUS,
      titleYMargin: 10,
      buttonLength: 25,
      buttonXMargin: 10,
      contentXMargin: 20,
      contentYMargin: 10
    },

    PANEL_OPTIONS: {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      cornerRadius: PANEL_CORNER_RADIUS,
      xMargin: 20,
      yMargin: 15
    },

    PICKER_TOUCH_AREA_X_DILATION: 30,

    MANIPULATOR_RADIUS: 0.425,
    POINT_RADIUS: 0.25,

    // font sizes
    STANDARD_EQUATION_FONT_SIZE: 22,
    INTERACTIVE_EQUATION_FONT_SIZE: 26,
    SLIDER_TICK_LABEL_FONT_SIZE: 16,
    CHECKBOX_LABEL_FONT_SIZE: 18,
    CHECKBOX_EQUATION_FONT_SIZE: 20,

    // line widths
    INTERACTIVE_CURVE_LINE_WIDTH: 4,
    SAVED_CURVE_LINE_WIDTH: 2,
    QUADRATIC_TERMS_LINE_WIDTH: 2, // y = ax^2, y = bx, y = c
    AXIS_OF_SYMMETRY_LINE_WIDTH: 3,
    DIRECTRIX_LINE_WIDTH: 3,

    // line dashes
    AXIS_OF_SYMMETRY_LINE_DASH: [ 5, 5 ],
    DIRECTRIX_LINE_DASH: [ 5, 5 ],

    // decimal places
    EQUATION_DECIMALS: 2,
    POINT_DECIMALS: 2,
    POINT_TOOL_DECIMALS: 1
  };

  return graphingQuadratics.register( 'GQConstants', GQConstants );
} );
