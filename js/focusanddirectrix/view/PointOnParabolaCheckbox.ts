// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Point on Quadratic' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class PointOnParabolaCheckbox extends GQCheckbox {

  public constructor( pointOnParabolaVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // icon is a manipulator (3D sphere)
    const icon = Manipulator.createIcon( 8, GQColors.POINT_ON_PARABOLA );

    super( pointOnParabolaVisibleProperty, GraphingQuadraticsStrings.pointOnParabola, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows the point on the parabola on the graph'
    } );
  }
}

graphingQuadratics.register( 'PointOnParabolaCheckbox', PointOnParabolaCheckbox );