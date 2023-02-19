// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Focus' checkbox.
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

export default class FocusCheckbox extends GQCheckbox {

  public constructor( focusVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // icon is a manipulator (3D sphere)
    const icon = Manipulator.createIcon( 8, GQColors.FOCUS );

    super( focusVisibleProperty, GraphingQuadraticsStrings.focus, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows the focus on the graph'
    } );
  }
}

graphingQuadratics.register( 'FocusCheckbox', FocusCheckbox );