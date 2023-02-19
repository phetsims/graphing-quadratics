// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Directrix' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { Line } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class DirectrixCheckbox extends GQCheckbox {

  public constructor( directrixVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // icon is a horizontal dashed line
    const icon = new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[ 0 ], 0, {
      stroke: GQColors.DIRECTRIX,
      lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
      lineDash: GQConstants.DIRECTRIX_LINE_DASH
    } );

    super( directrixVisibleProperty, GraphingQuadraticsStrings.directrix, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows the directrix on the graph'
    } );
  }
}

graphingQuadratics.register( 'DirectrixCheckbox', DirectrixCheckbox );