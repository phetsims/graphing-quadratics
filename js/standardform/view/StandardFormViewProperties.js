// Copyright 2018-2020, University of Colorado Boulder

/**
 * View-specific Properties for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class StandardFormViewProperties extends GQViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // {boolean} values for optional BooleanProperties
      vertexVisible: false,
      axisOfSymmetryVisible: false,
      coordinatesVisible: true,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( options );

    // @public
    this.rootsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'rootsVisibleProperty' ),
      phetioDocumentation: 'whether the roots of the quadratic are visible'
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.rootsVisibleProperty.reset();
  }
}

graphingQuadratics.register( 'StandardFormViewProperties', StandardFormViewProperties );
export default StandardFormViewProperties;