// Copyright 2018-2019, University of Colorado Boulder

/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import graphingQuadraticsStrings from '../../graphing-quadratics-strings.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQCheckbox from './GQCheckbox.js';

const coordinatesString = graphingQuadraticsStrings.coordinates;

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

    super( coordinatesString, coordinatesVisibleProperty, options );
  }
}

graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );
export default CoordinatesCheckbox;