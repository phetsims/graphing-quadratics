// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQCheckbox from './GQCheckbox.js';

export default class CoordinatesCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( coordinatesVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that makes the (x,y) coordinates visible on points on the graph'

    }, options );

    super( coordinatesVisibleProperty, GraphingQuadraticsStrings.coordinates, options );
  }
}

graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );