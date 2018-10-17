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
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      super( options );

      // @public
      this.vertexVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'vertexVisibleProperty' ),
        phetioDocumentation: 'whether the vertex is visible'
      } );

      // @public
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'axisOfSymmetryVisibleProperty' ),
        phetioDocumentation: 'whether the axis of symmetry is visible'
      } );

      // @public
      this.rootsVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'rootsVisibleProperty' ),
        phetioDocumentation: 'whether the roots of the quadratic are visible'
      } );

      // @public
      this.coordinatesVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'coordinatesVisibleProperty' ),
        phetioDocumentation: 'whether (x,y) coordinates are visible on points that are displayed on the graph'
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
      this.rootsVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'StandardFormViewProperties', StandardFormViewProperties );
} );

 