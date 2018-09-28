// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Focus & Directrix' screen.
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

  class FocusAndDirectrixViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        equationForm: 'vertex',
        coordinatesVisible: GQQueryParameters.checkAll,
        tandem: Tandem.required
      }, options );

      super( options );

      // @public
      this.vertexVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'vertexVisibleProperty' ),
        phetioInstanceDocumentation: 'whether the vertex manipulator is visible'
      } );

      // @public
      this.focusVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'focusVisibleProperty' ),
        phetioInstanceDocumentation: 'whether the focus manipulator is visible'
      } );

      // @public
      this.directrixVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'directrixVisibleProperty' ),
        phetioInstanceDocumentation: 'whether the directrix is visible'
      } );

      // @public whether an interactive point is visible on the quadratic
      this.pointOnQuadraticVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'pointOnQuadraticVisibleProperty' ),
        phetioInstanceDocumentation: 'whether the interactive point on the quadratic is visible'
      } );
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
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );
} );

 