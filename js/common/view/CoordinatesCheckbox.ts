// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQCheckbox from './GQCheckbox.js';

export default class CoordinatesCheckbox extends GQCheckbox {

  public constructor( coordinatesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    super( coordinatesVisibleProperty, GraphingQuadraticsStrings.coordinates, {
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the (x,y) coordinates visible on points on the graph'
    } );
  }
}

graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );