// Copyright 2014-2023, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import graphingQuadratics from '../graphingQuadratics.js';
import { ProfileColorProperty } from '../../../scenery/js/imports.js';

// common colors
const VERTEX = 'rgb( 128, 0, 128 )'; // purple
const FOCUS = 'green';

const GQColors = {

  // NOTE: Colors for curves are not using ProfileColorProperty because doing so would require changing the API for
  // QuadraticIO. So unless there's a solid need to have profile support for these colors, leave them as is.
  // See https://github.com/phetsims/graphing-quadratics/issues/204#issuecomment-1730736421

  // interactive curves on each screen
  EXPLORE_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
  STANDARD_FORM_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
  VERTEX_FORM_INTERACTIVE_CURVE: 'black',
  FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE: 'black',

  // curves common to all screens
  SAVED_CURVE: 'rgb( 160, 160, 160 )',

  // quadratic equation terms on the Explore screen
  QUADRATIC_TERM: 'blue',
  LINEAR_TERM: 'green',
  CONSTANT_TERM: 'magenta',

  // Coefficients on the Explore screen
  exploreAColorProperty: new ProfileColorProperty( graphingQuadratics, 'exploreAColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  exploreBColorProperty: new ProfileColorProperty( graphingQuadratics, 'exploreBColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  exploreCColorProperty: new ProfileColorProperty( graphingQuadratics, 'exploreCColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),

  // Coefficients on the Standard Form screen
  standardFormAColorProperty: new ProfileColorProperty( graphingQuadratics, 'standardFormAColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  standardFormBColorProperty: new ProfileColorProperty( graphingQuadratics, 'standardFormBColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  standardFormCColorProperty: new ProfileColorProperty( graphingQuadratics, 'standardFormCColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),

  // Coefficients on the Vertex Form screen
  vertexFormAColorProperty: new ProfileColorProperty( graphingQuadratics, 'vertexFormAColor', {
    default: FOCUS
  } ),
  vertexFormHColorProperty: new ProfileColorProperty( graphingQuadratics, 'vertexFormHColor', {
    default: VERTEX
  } ),
  vertexFormKColorProperty: new ProfileColorProperty( graphingQuadratics, 'vertexFormKColor', {
    default: VERTEX
  } ),

  // Coefficients on the Focus & Directrix screen
  focusAndDirectrixPColorProperty: new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixPColor', {
    default: FOCUS
  } ),
  focusAndDirectrixHColorProperty: new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixHColor', {
    default: VERTEX
  } ),
  focusAndDirectrixKColorProperty: new ProfileColorProperty( graphingQuadratics, 'focusAndDirectrixKColor', {
    default: VERTEX
  } ),

  // common to all screens
  screenBackgroundColorProperty: new ProfileColorProperty( graphingQuadratics, 'screenBackgroundColor', {
    default: 'rgb( 238, 252, 252 )'
  } ),
  controlPanelFillProperty: new ProfileColorProperty( graphingQuadratics, 'controlPanelFill', {
    default: 'rgb( 238, 238, 238 )'
  } ),
  separatorStrokeProperty: new ProfileColorProperty( graphingQuadratics, 'separatorStroke', {
    default: 'rgb( 212, 212, 212 )'
  } ),
  focusColorProperty: new ProfileColorProperty( graphingQuadratics, 'focusColor', {
    default: FOCUS
  } ),
  directrixColorProperty: new ProfileColorProperty( graphingQuadratics, 'directrixColor', {
    default: FOCUS
  } ),
  vertexColorProperty: new ProfileColorProperty( graphingQuadratics, 'vertexColor', {
    default: VERTEX
  } ),
  axisOfSymmetryColorProperty: new ProfileColorProperty( graphingQuadratics, 'axisOfSymmetryColor', {
    default: VERTEX
  } ),
  rootsColorProperty: new ProfileColorProperty( graphingQuadratics, 'rootsColor', {
    default: '#0071bc'
  } ),
  pointOnParabolaColorProperty: new ProfileColorProperty( graphingQuadratics, 'pointOnParabolaColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } )
};

graphingQuadratics.register( 'GQColors', GQColors );
export default GQColors;