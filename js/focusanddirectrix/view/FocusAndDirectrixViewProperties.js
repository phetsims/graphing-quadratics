// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );

  class FocusAndDirectrixViewProperties extends GQViewProperties {

    constructor() {

      super();

      // @public whether a point is displayed to mark the vertex of the quadratic
      this.vertexVisibleProperty = new BooleanProperty( true );

      // @public whether focus is visible
      this.focusVisibleProperty = new BooleanProperty( true );

      // @public whether directrix is visible
      this.directrixVisibleProperty = new BooleanProperty( true );

      // @public whether an interactive point is visible on the quadratic
      this.pointOnQuadraticVisibleProperty = new BooleanProperty( true );
      
      // @public whether coordinates are visible on points
      this.coordinatesVisibleProperty = new BooleanProperty( true );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.vertexVisibleProperty.reset();
      this.focusVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
      this.pointOnQuadraticVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );
} );

 