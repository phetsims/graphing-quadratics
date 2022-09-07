// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Equations' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQCheckbox from './GQCheckbox.js';

class EquationsCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} equationsVisibleProperty
   * @param {Object} [options]
   */
  constructor( equationsVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that shows equations on graphed curves'

    }, options );

    super( equationsVisibleProperty, GraphingQuadraticsStrings.equations, options );
  }
}

graphingQuadratics.register( 'EquationsCheckbox', EquationsCheckbox );
export default EquationsCheckbox;