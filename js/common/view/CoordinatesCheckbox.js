// Copyright 2018-2020, University of Colorado Boulder

/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';
import GQCheckbox from './GQCheckbox.js';

class CoordinatesCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( coordinatesVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that makes the (x,y) coordinates visible on points on the graph'

    }, options );

    super( graphingQuadraticsStrings.coordinates, coordinatesVisibleProperty, options );
  }
}

graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );
export default CoordinatesCheckbox;