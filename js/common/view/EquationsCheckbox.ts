// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Equations' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQCheckbox from './GQCheckbox.js';

export default class EquationsCheckbox extends GQCheckbox {

  public constructor( equationsVisibleProperty: Property<boolean>, tandem: Tandem ) {

    super( equationsVisibleProperty, GraphingQuadraticsStrings.equations, {
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows equations on graphed curves'
    } );
  }
}

graphingQuadratics.register( 'EquationsCheckbox', EquationsCheckbox );