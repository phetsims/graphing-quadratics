// Copyright 2018-2020, University of Colorado Boulder

/**
 * 'Focus' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import merge from '../../../../phet-core/js/merge.js';
import GQColors from '../../common/GQColors.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadraticsStrings from '../../graphing-quadratics-strings.js';
import graphingQuadratics from '../../graphingQuadratics.js';

const focusString = graphingQuadraticsStrings.focus;

class FocusCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} focusVisibleProperty
   * @param {Object} [options]
   */
  constructor( focusVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that shows the focus on the graph'

    }, options );

    // icon is a manipulator (3D sphere)
    assert && assert( !options.icon, 'FocusCheckbox sets icon' );
    options.icon = Manipulator.createIcon( 8, GQColors.FOCUS );

    super( focusString, focusVisibleProperty, options );
  }
}

graphingQuadratics.register( 'FocusCheckbox', FocusCheckbox );
export default FocusCheckbox;