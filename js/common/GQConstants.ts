// Copyright 2014-2025, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import { NumberDisplayOptions } from '../../../scenery-phet/js/NumberDisplay.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { AccordionBoxOptions } from '../../../sun/js/AccordionBox.js';
import { NumberPickerOptions } from '../../../sun/js/NumberPicker.js';
import { PanelOptions } from '../../../sun/js/Panel.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GQColors from './GQColors.js';
import { CreditsData } from '../../../joist/js/CreditsNode.js';

const PANEL_CORNER_RADIUS = 5; // corner radius for all panel-like containers

export default class GQConstants {

  private constructor() {
    // Not intended for instantiation.
  }

  public static readonly CREDITS: CreditsData = {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.), Andrea Lin',
    team: 'Catherine Carter, Mike Dubson, Karina K. R. Hensberry, Trish Loeblein, Ariel Paul, Kathy Perkins, Taliesin Smith',
    qualityAssurance: 'Jaspe Arias, Steele Dalton, Jaron Droder, Clifford Hardin, Brooklyn Lash, Emily Miller, Laura Rea, Jacob Romero, Nancy Salpepi, Ethan Ward, Kathryn Woessner, Kelly Wurtz'
  };

    // Custom layout bounds because this sim is part of the Graphing Lines family, which was ported to Java.
  // We used Java's layoutBounds in order to avoid changing sizes, fonts, etc. during the port.
  // The bounds width was modified to match the default HTML5 layoutBounds aspect ratio.
  // See https://github.com/phetsims/graphing-quadratics/issues/121
  // PhET-iO customizations may rely on these bounds, so do not change!
  // See https://github.com/phetsims/graphing-quadratics/issues/181
  public static readonly SCREEN_VIEW_LAYOUT_BOUNDS = new Bounds2( 0, 0, 1160, 700 );
  public static readonly SCREEN_VIEW_X_MARGIN = 50;
  public static readonly SCREEN_VIEW_Y_MARGIN = 16;

  // range of the graph's axes
  public static readonly X_AXIS_RANGE = new Range( -10, 10 );
  public static readonly Y_AXIS_RANGE = new Range( -10, 10 );

  // options for various UI components
  public static readonly ACCORDION_BOX_OPTIONS: AccordionBoxOptions = {
    fill: GQColors.controlPanelFillProperty,
    cornerRadius: PANEL_CORNER_RADIUS,
    titleYMargin: 10,
    buttonXMargin: 10,
    buttonYMargin: 10,
    contentXMargin: 20,
    contentYMargin: 15,
    expandCollapseButtonOptions: {
      sideLength: 25
    }
  };

  public static readonly PANEL_OPTIONS: PanelOptions = {
    fill: GQColors.controlPanelFillProperty,
    cornerRadius: PANEL_CORNER_RADIUS,
    xMargin: 20,
    yMargin: 15
  };

  public static readonly NUMBER_DISPLAY_OPTIONS: NumberDisplayOptions = {
    textOptions: {
      font: new PhetFont( { size: 26, weight: 'bold' } )
    },
    backgroundFill: null,
    backgroundStroke: null,
    backgroundLineWidth: 0,
    xMargin: 0,
    yMargin: 0
  };

  public static readonly NUMBER_PICKER_OPTIONS: NumberPickerOptions = {
    font: new PhetFont( 26 ),
    xMargin: 5,
    touchAreaXDilation: 30,
    visiblePropertyOptions: {
      phetioFeatured: false
    }
  };

  // vertical space between checkboxes
  public static readonly CHECKBOXES_Y_SPACING = 15;

  // radii
  public static readonly MANIPULATOR_RADIUS = 0.425; // radius of manipulators, in model coordinates
  public static readonly POINT_RADIUS = 0.25; // radius of non-interactive points, in model coordinates

  // fonts
  public static readonly TITLE_FONT = new PhetFont( 20 );
  public static readonly SLIDER_LABEL_FONT = new PhetFont( { size: 26, weight: 'bold' } );
  public static readonly SLIDER_TICK_LABEL_FONT = new PhetFont( 16 );
  public static readonly CHECKBOX_LABEL_FONT = new PhetFont( 20 );
  public static readonly GRAPHED_EQUATION_FONT = new PhetFont( 18 );
  public static readonly INTERACTIVE_EQUATION_FONT = new PhetFont( 26 );
  public static readonly INTERACTIVE_EQUATION_FRACTION_FONT = new PhetFont( 22 );
  public static readonly COORDINATES_FONT = new PhetFont( { size: 16, weight: 'bold' } );
  public static readonly NO_REAL_ROOTS_FONT = new PhetFont( { size: 18, weight: 'bold' } );

  // line widths
  public static readonly INTERACTIVE_QUADRATIC_LINE_WIDTH = 4;
  public static readonly SAVED_QUADRATIC_LINE_WIDTH = 3;
  public static readonly QUADRATIC_TERMS_LINE_WIDTH = 2; // y = ax^2, y = bx, y = c
  public static readonly AXIS_OF_SYMMETRY_LINE_WIDTH = 3;
  public static readonly DIRECTRIX_LINE_WIDTH = 3;
  public static readonly POINT_ON_PARABOLA_LINE_WIDTH = 3; // lines that connect point to focus and directrix

  // line dashes
  public static readonly AXIS_OF_SYMMETRY_LINE_DASH = [ 5, 5 ];
  public static readonly DIRECTRIX_LINE_DASH = [ 5, 5 ];
  public static readonly POINT_ON_PARABOLA_LINE_DASH = [ 5, 5 ]; // lines that connect point to focus and directrix

  // decimal places
  public static readonly AXIS_OF_SYMMETRY_DECIMALS = 2;
  public static readonly DIRECTRIX_DECIMALS = 2;
  public static readonly FOCUS_DECIMALS = 2;
  public static readonly POINT_ON_PARABOLA_DECIMALS = 2;
  public static readonly POINT_TOOL_DECIMALS = 2;
  public static readonly ROOTS_DECIMALS = 2;
  public static readonly VERTEX_DECIMALS = 2;
  public static readonly EXPLORE_DECIMALS_A = 2;
  public static readonly EXPLORE_DECIMALS_B = 1;
  public static readonly EXPLORE_DECIMALS_C = 1;
  public static readonly FOCUS_AND_DIRECTRIX_DECIMALS_A = 3;
  public static readonly FOCUS_AND_DIRECTRIX_DECIMALS_P = 1;
  public static readonly FOCUS_AND_DIRECTRIX_DECIMALS_H = 1;
  public static readonly FOCUS_AND_DIRECTRIX_DECIMALS_K = 1;

  // slider intervals
  public static readonly EXPLORE_INTERVAL_A = 0.01;
  public static readonly EXPLORE_SNAP_TO_ZERO_EPSILON_A = 0.03;
  public static readonly EXPLORE_INTERVAL_B = 0.1;
  public static readonly EXPLORE_INTERVAL_C = 0.1;
  public static readonly FOCUS_AND_DIRECTRIX_INTERVAL_P = 0.1;
  public static readonly FOCUS_AND_DIRECTRIX_INTERVAL_H = 0.1;
  public static readonly FOCUS_AND_DIRECTRIX_INTERVAL_K = 0.1;

  // margins between equations and edges of graph
  // Caution! Changing these may cause an equation to go off the graph. Test thoroughly!
  public static readonly EQUATION_X_MARGIN = 1.5; // distance between equation and left/right edges of graph, in model coordinate frame
  public static readonly EQUATION_Y_MARGIN = 0.5; // distance between equation and top/bottom edges of graph, in model coordinate frame

  // spacing between equation and the curve that it labels, in view coordinate frame
  public static readonly EQUATION_CURVE_SPACING = 5;

  // spacing around operators in interactive equations, in view coordinate frame
  public static readonly EQUATION_OPERATOR_SPACING = 8;

  // spacing within terms in interactive equations, in view coordinate frame
  public static readonly EQUATION_TERM_SPACING = 6;

  // PhET-iO documentation patterns
  public static readonly VALUE_DOC = 'value of \'{{symbol}}\' in the interactive equation';
  public static readonly PICKER_DOC = 'picker for \'{{symbol}}\' value';
  public static readonly SLIDER_DOC = 'slider for \'{{symbol}}\' value';
}

graphingQuadratics.register( 'GQConstants', GQConstants );