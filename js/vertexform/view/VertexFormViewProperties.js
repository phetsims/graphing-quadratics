// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Vertex Form' screen.
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
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        equationForm: 'vertex',
        tandem: Tandem.required
      }, options );

      super( options );

      // @public
      this.vertexVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'vertexVisibleProperty' ),
        phetioDocumentation: 'whether the vertex manipulator is visible'
      } );

      // @public
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'axisOfSymmetryVisibleProperty' ),
        phetioDocumentation: 'whether the axis of symmetry is visible'
      } );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.vertexVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'VertexFormViewProperties', VertexFormViewProperties );
} );

 