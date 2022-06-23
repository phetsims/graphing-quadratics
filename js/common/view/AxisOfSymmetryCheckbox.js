// Copyright 2018-2021, University of Colorado Boulder

/**
 * 'Axis of Symmetry' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Line } from '../../../../scenery/js/imports.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQCheckbox from './GQCheckbox.js';

class AxisOfSymmetryCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} axisOfSymmetryVisibleProperty
   * @param {Object} [options]
   */
  constructor( axisOfSymmetryVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that makes the axis of symmetry visible on the graph'

    }, options );

    // icon is a vertical dashed line
    assert && assert( !options.icon, 'AxisOfSymmetryCheckbox sets icon' );
    options.icon = new Line( 0, 0, 0, 5 * GQConstants.AXIS_OF_SYMMETRY_LINE_DASH[ 0 ], {
      stroke: GQColors.AXIS_OF_SYMMETRY,
      lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
      lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
    } );

    super( axisOfSymmetryVisibleProperty, graphingQuadraticsStrings.axisOfSymmetry, options );
  }
}

graphingQuadratics.register( 'AxisOfSymmetryCheckbox', AxisOfSymmetryCheckbox );
export default AxisOfSymmetryCheckbox;