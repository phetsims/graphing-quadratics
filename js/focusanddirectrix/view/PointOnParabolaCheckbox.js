// Copyright 2018-2020, University of Colorado Boulder

/**
 * 'Point on Quadratic' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import merge from '../../../../phet-core/js/merge.js';
import GQColors from '../../common/GQColors.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';

class PointOnParabolaCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} pointOnParabolaVisibleProperty
   * @param {Object} [options]
   */
  constructor( pointOnParabolaVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that shows the point on the parabola on the graph'

    }, options );

    // icon is a manipulator (3D sphere)
    assert && assert( !options.icon, 'PointOnParabolaCheckbox sets icon' );
    options.icon = Manipulator.createIcon( 8, GQColors.POINT_ON_PARABOLA );

    super( graphingQuadraticsStrings.pointOnParabola, pointOnParabolaVisibleProperty, options );
  }
}

graphingQuadratics.register( 'PointOnParabolaCheckbox', PointOnParabolaCheckbox );
export default PointOnParabolaCheckbox;