// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );

  class ExploreViewProperties extends GQViewProperties {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      super( tandem );

      // @public
      this.quadraticTermsAccordionBoxExpandedProperty = new BooleanProperty( true, {
        tandem: tandem.createTandem( 'quadraticTermsAccordionBoxExpandedProperty' ),
        phetioDocumentation: 'whether the quadratic terms accordion box is expanded'
      } );

      // @public
      this.quadraticTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: tandem.createTandem( 'quadraticTermVisibleProperty' ),
        phetioDocumentation: 'whether the quadratic term, y = ax^2, is visible'
      } );

      // @public
      this.linearTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: tandem.createTandem( 'linearTermVisibleProperty' ),
        phetioDocumentation: 'whether the linear term, y = bx, is visible'
      } );

      // @public
      this.constantTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: tandem.createTandem( 'constantTermVisibleProperty' ),
        phetioDocumentation: 'whether the constant term, y = c, is visible'
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

  return graphingQuadratics.register( 'ExploreViewProperties', ExploreViewProperties );
} );

 