// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Roots' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { Circle, HBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

// constants
const POINT_RADIUS = 6;

export default class RootsCheckbox extends GQCheckbox {

  public constructor( rootsVisibleProperty: Property<boolean>, tandem: Tandem ) {

    // icon is a pair of circles
    const icon = new HBox( {
      align: 'center',
      spacing: 5,
      children: [
        new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } ),
        new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } )
      ]
    } );

    super( rootsVisibleProperty, GraphingQuadraticsStrings.roots, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows roots on the graph'
    } );
  }
}

graphingQuadratics.register( 'RootsCheckbox', RootsCheckbox );