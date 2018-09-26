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

    constructor() {

      super();

      // @public whether the terms accordion box is expanded
      this.termsAccordionBoxExpandedProperty = new BooleanProperty( true );

      // @public whether the quadratic term (y=ax^2) is displayed on the graph
      this.quadraticTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll );

      // @public whether the linear term (y=bx) is displayed on the graph
      this.linearTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll );

      // @public whether the constant term (y=c) is displayed on the graph
      this.constantTermVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.termsAccordionBoxExpandedProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'ExploreViewProperties', ExploreViewProperties );
} );

 