// Copyright 2018-2020, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class ExploreViewProperties extends GQViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( options );

    // @public
    this.quadraticTermsAccordionBoxExpandedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'quadraticTermsAccordionBoxExpandedProperty' ),
      phetioDocumentation: 'whether the Quadratic Terms accordion box is expanded'
    } );

    // @public
    this.quadraticTermVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'quadraticTermVisibleProperty' ),
      phetioDocumentation: 'whether the quadratic term (y = ax^2) is visible'
    } );

    // @public
    this.linearTermVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'linearTermVisibleProperty' ),
      phetioDocumentation: 'whether the linear term (y = bx) is visible'
    } );

    // @public
    this.constantTermVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'constantTermVisibleProperty' ),
      phetioDocumentation: 'whether the constant term (y = c) is visible'
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.quadraticTermsAccordionBoxExpandedProperty.reset();
    this.quadraticTermVisibleProperty.reset();
    this.linearTermVisibleProperty.reset();
    this.constantTermVisibleProperty.reset();
  }
}

graphingQuadratics.register( 'ExploreViewProperties', ExploreViewProperties );
export default ExploreViewProperties;