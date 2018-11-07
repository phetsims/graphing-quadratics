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
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class FocusAndDirectrixViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // {string} form of equations used to label curves on the graph, see GQConstants.EQUATION_FORMS
        equationForm: 'vertex',

        // {boolean} values for optional BooleanProperties
        vertexVisible: true,
        coordinatesVisible: true,

        // phet-io
        tandem: Tandem.required
      }, options );

      super( options );

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
      this.pointOnParabolaVisibleProperty = new BooleanProperty( false, {
        tandem: options.tandem.createTandem( 'pointOnParabolaVisibleProperty' ),
        phetioDocumentation: 'whether the manipulator for the point on the parabola is visible'
      } );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.focusVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
      this.pointOnParabolaVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );
} );

 