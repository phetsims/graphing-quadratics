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
        tandem: Tandem.required
      }, options );

      super( options );

      // @public
      this.vertexVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'vertexVisibleProperty' ),
        phetioDocumentation: 'whether the vertex manipulator is visible'
      } );

      // @public
      this.focusVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'focusVisibleProperty' ),
        phetioDocumentation: 'whether the focus manipulator is visible'
      } );

      // @public
      this.directrixVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'directrixVisibleProperty' ),
        phetioDocumentation: 'whether the directrix is visible'
      } );

      // @public whether an interactive point is visible on the quadratic
      this.pointOnParabolaVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'pointOnParabolaVisibleProperty' ),
        phetioDocumentation: 'whether the manipulator for the point on the parabola is visible'
      } );

      // @public
      this.coordinatesVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
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
      this.focusVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
      this.pointOnParabolaVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );
} );

 