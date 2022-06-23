// Copyright 2018-2021, University of Colorado Boulder

/**
 * 'Directrix' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Line } from '../../../../scenery/js/imports.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';

class DirectrixCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} directrixVisibleProperty
   * @param {Object} [options]
   */
  constructor( directrixVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that shows the directrix on the graph'

    }, options );

    // icon is a horizontal dashed line
    assert && assert( !options.icon, 'DirectrixCheckbox sets icon' );
    options.icon = new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[ 0 ], 0, {
      stroke: GQColors.DIRECTRIX,
      lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
      lineDash: GQConstants.DIRECTRIX_LINE_DASH
    } );

    super( directrixVisibleProperty, graphingQuadraticsStrings.directrix, options );
  }
}

graphingQuadratics.register( 'DirectrixCheckbox', DirectrixCheckbox );
export default DirectrixCheckbox;