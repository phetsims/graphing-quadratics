// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );

  class VertexFormViewProperties extends GQViewProperties {

    constructor() {

      super();

      // @public whether the vertex manipulator is visible
      this.vertexVisibleProperty = new BooleanProperty( true );

      // @public whether the axis of symmetry is visible
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

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
      this.axisOfSymmetryVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'VertexFormViewProperties', VertexFormViewProperties );
} );

 