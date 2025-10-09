// Copyright 2014-2025, University of Colorado Boulder

/**
 * GQColors is the set of colors used throughout this project.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import graphingQuadratics from '../graphingQuadratics.js';
import affirm from '../../../perennial-alias/js/browser-and-node/affirm.js';
import Color from '../../../scenery/js/util/Color.js';

// common colors
const VERTEX_COLOR = 'rgb( 128, 0, 128 )'; // purple
const FOCUS_COLOR = 'green';

export default class GQColors {

  private constructor() {
    // Not intended for instantiation.
  }
  
  // NOTE: Colors for curves are not using ProfileColorProperty because doing so would require changing the PhET-iO API
  // for QuadraticIO. So unless there's a solid need to have profile support for these colors, leave them as is.
  // See https://github.com/phetsims/graphing-quadratics/issues/204#issuecomment-1730736421

  // interactive curves on each screen
  public static readonly EXPLORE_INTERACTIVE_CURVE = PhetColorScheme.RED_COLORBLIND;
  public static readonly STANDARD_FORM_INTERACTIVE_CURVE = PhetColorScheme.RED_COLORBLIND;
  public static readonly VERTEX_FORM_INTERACTIVE_CURVE = 'black';
  public static readonly FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE = 'black';

  // curves common to all screens
  public static readonly SAVED_CURVE = 'rgb( 160, 160, 160 )';

  // quadratic equation terms on the Explore screen
  public static readonly QUADRATIC_TERM = 'blue';
  public static readonly LINEAR_TERM = 'green';
  public static readonly CONSTANT_TERM = 'magenta';

  // Coefficients on the Explore screen
  public static readonly exploreAColorProperty = new ProfileColorProperty( graphingQuadratics, 'exploreAColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );
  public static readonly exploreBColorProperty = new ProfileColorProperty( graphingQuadratics, 'exploreBColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );
  public static readonly exploreCColorProperty = new ProfileColorProperty( graphingQuadratics, 'exploreCColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );

  // Coefficients on the Standard Form screen
  public static readonly standardFormAColorProperty = new ProfileColorProperty( graphingQuadratics, 'standardFormAColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );
  public static readonly standardFormBColorProperty = new ProfileColorProperty( graphingQuadratics, 'standardFormBColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );
  public static readonly standardFormCColorProperty = new ProfileColorProperty( graphingQuadratics, 'standardFormCColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } );

  // Coefficients on the Vertex Form screen
  public static readonly vertexFormAColorProperty = new ProfileColorProperty( graphingQuadratics, 'vertexFormAColor', {
    default: FOCUS_COLOR
  } );
  public static readonly vertexFormHColorProperty = new ProfileColorProperty( graphingQuadratics, 'vertexFormHColor', {
    default: VERTEX_COLOR
  } );
  public static readonly vertexFormKColorProperty = new ProfileColorProperty( graphingQuadratics, 'vertexFormKColor', {
    default: VERTEX_COLOR
  } );

  // Coefficients on the Focus & Directrix screen
  public static readonly focusAndDirectrixPColorProperty = new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixPColor', {
    default: FOCUS_COLOR
  } );
  public static readonly focusAndDirectrixHColorProperty = new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixHColor', {
    default: VERTEX_COLOR
  } );
  public static readonly focusAndDirectrixKColorProperty = new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixKColor', {
    default: VERTEX_COLOR
  } );

  // common to all screens
  public static readonly screenBackgroundColorProperty = new ProfileColorProperty( graphingQuadratics, 'screenBackgroundColor', {
    default: 'rgb( 238, 252, 252 )'
  } );
  public static readonly controlPanelFillProperty = new ProfileColorProperty( graphingQuadratics, 'controlPanelFill', {
    default: 'rgb( 238, 238, 238 )'
  } );
  public static readonly separatorStrokeProperty = new ProfileColorProperty( graphingQuadratics, 'separatorStroke', {
    default: 'rgb( 212, 212, 212 )'
  } );
  public static readonly focusColorProperty = new ProfileColorProperty( graphingQuadratics, 'focusColor', {
    default: FOCUS_COLOR
  } );
  public static readonly directrixColorProperty = new ProfileColorProperty( graphingQuadratics, 'directrixColor', {
    default: FOCUS_COLOR
  } );
  public static readonly vertexColorProperty = new ProfileColorProperty( graphingQuadratics, 'vertexColor', {
    default: VERTEX_COLOR
  } );
  public static readonly axisOfSymmetryColorProperty = new ProfileColorProperty( graphingQuadratics, 'axisOfSymmetryColor', {
    default: VERTEX_COLOR
  } );
  public static readonly rootsFillProperty = new ProfileColorProperty( graphingQuadratics, 'rootsFill', {
    default: 'white'
  } );
  public static readonly rootsStrokeProperty = new ProfileColorProperty( graphingQuadratics, 'rootsStroke', {
    default: '#0071bc'
  } );
  public static readonly pointOnParabolaColorProperty = new ProfileColorProperty( graphingQuadratics, 'pointOnParabolaColor', {
    default: '#dd3b05'
  } );
}

// Compares two colors to determine if they are the same.
function equalColors( color1: Color | string, color2: Color | string ): boolean {
  return Color.toColor( color1 ).equals( Color.toColor( color2 ) );
}

// Determines whether a set of colors are unique.
function uniqueColors( colors: Array<Color | string> ): boolean {
  return _.uniqWith( colors, equalColors ).length === colors.length;
}

// Verify that all curves on each screen have unique colors, as required by PointToolNode and
// https://github.com/phetsims/graphing-quadratics/issues/250.
affirm( uniqueColors( [ GQColors.EXPLORE_INTERACTIVE_CURVE, GQColors.SAVED_CURVE, GQColors.QUADRATIC_TERM, GQColors.LINEAR_TERM, GQColors.CONSTANT_TERM ] ) );
affirm( uniqueColors( [ GQColors.STANDARD_FORM_INTERACTIVE_CURVE, GQColors.SAVED_CURVE ] ) );
affirm( uniqueColors( [ GQColors.VERTEX_FORM_INTERACTIVE_CURVE, GQColors.SAVED_CURVE ] ) );
affirm( uniqueColors( [ GQColors.FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE, GQColors.SAVED_CURVE ] ) );

graphingQuadratics.register( 'GQColors', GQColors );