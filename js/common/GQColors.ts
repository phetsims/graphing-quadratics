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

  // interactive curves on each screen
  EXPLORE_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
  STANDARD_FORM_INTERACTIVE_CURVE: PhetColorScheme.RED_COLORBLIND,
  VERTEX_FORM_INTERACTIVE_CURVE: 'black',
  FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE: 'black',

  // quadratic equation terms on the Explore screen
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
  VERTEX_FORM_A: FOCUS,
  VERTEX_FORM_H: VERTEX,
  VERTEX_FORM_K: VERTEX,

  // Coefficients on the Focus & Directrix screen
  FOCUS_AND_DIRECTRIX_P: FOCUS,
  FOCUS_AND_DIRECTRIX_H: VERTEX,
  FOCUS_AND_DIRECTRIX_K: VERTEX,

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
  SAVED_CURVE: 'rgb( 160, 160, 160 )',
  FOCUS: FOCUS,
  DIRECTRIX: 'green',
  VERTEX: VERTEX,
  AXIS_OF_SYMMETRY: VERTEX,
  ROOTS: '#0071bc',
  POINT_ON_PARABOLA: PhetColorScheme.RED_COLORBLIND
};

graphingQuadratics.register( 'GQColors', GQColors );
export default GQColors;