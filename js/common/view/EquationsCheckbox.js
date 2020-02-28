// Copyright 2018-2020, University of Colorado Boulder

/**
 * 'Equations' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import graphingQuadraticsStrings from '../../graphing-quadratics-strings.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQCheckbox from './GQCheckbox.js';

const equationsString = graphingQuadraticsStrings.equations;

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

    super( equationsString, equationsVisibleProperty, options );
  }
}

graphingQuadratics.register( 'EquationsCheckbox', EquationsCheckbox );
export default EquationsCheckbox;