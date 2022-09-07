// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Roots' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Circle, HBox } from '../../../../scenery/js/imports.js';
import GQColors from '../../common/GQColors.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

// constants
const POINT_RADIUS = 6;

class RootsCheckbox extends GQCheckbox {

  /**
   * @param {BooleanProperty} rootsVisibleProperty
   * @param {Object} [options]
   */
  constructor( rootsVisibleProperty, options ) {

    options = merge( {

      // phet-io
      phetioDocumentation: 'checkbox that shows roots on the graph'

    }, options );

    // icon is a pair of circles
    assert && assert( !options.icon, 'RootsCheckbox sets icon' );
    options.icon = new HBox( {
      align: 'center',
      spacing: 5,
      children: [
        new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } ),
        new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } )
      ]
    } );

    super( rootsVisibleProperty, GraphingQuadraticsStrings.roots, options );
  }
}

graphingQuadratics.register( 'RootsCheckbox', RootsCheckbox );
export default RootsCheckbox;