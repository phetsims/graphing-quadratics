// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Axis of Symmetry' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { Line } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQCheckbox from './GQCheckbox.js';

export default class AxisOfSymmetryCheckbox extends GQCheckbox {

  public constructor( axisOfSymmetryVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // icon is a vertical dashed line
    const icon = new Line( 0, 0, 0, 5 * GQConstants.AXIS_OF_SYMMETRY_LINE_DASH[ 0 ], {
      stroke: GQColors.AXIS_OF_SYMMETRY,
      lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
      lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
    } );

    super( axisOfSymmetryVisibleProperty, GraphingQuadraticsStrings.axisOfSymmetry, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the axis of symmetry visible on the graph'
    } );
  }
}

graphingQuadratics.register( 'AxisOfSymmetryCheckbox', AxisOfSymmetryCheckbox );