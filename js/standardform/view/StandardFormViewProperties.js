// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );

  class StandardFormViewProperties extends GQViewProperties {

    constructor() {

      super();

      // @public whether the vertex point is visible
      this.vertexVisibleProperty = new BooleanProperty( false );

      // @public whether the axis of symmetry is visible
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

      // @public whether the roots of the quadratic are visible
      this.rootsVisibleProperty = new BooleanProperty( false );

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
      this.rootsVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'StandardFormViewProperties', StandardFormViewProperties );
} );

 