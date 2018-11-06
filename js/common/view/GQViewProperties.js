// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties and properties that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        equationForm: 'standard', // see GQConstants.EQUATION_FORMS
        tandem: Tandem.required
      }, options );

      assert && assert( GQConstants.EQUATION_FORMS.includes( options.equationForm ),
        'invalid equationForm: ' + options.equationForm );

      // @public {string} form of equations used to label curves. It is not necessary to expose this via PhET-iO.
      this.equationForm = options.equationForm;

      // @public
      this.graphContentsVisibleProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'graphContentsVisibleProperty' ),
        phetioDocumentation: 'whether the contents of the graph (curves, plotted points, manipulators) are visible'
      } );

      // @public
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( true, {
        tandem: options.tandem.createTandem( 'equationAccordionBoxExpandedProperty' ),
        phetioDocumentation: 'whether the equation accordion box is expanded'
      } );

      // @public
      this.equationsVisibleProperty = new BooleanProperty( GQQueryParameters.checkAll, {
        tandem: options.tandem.createTandem( 'equationsVisibleProperty' ),
        phetioDocumentation: 'whether equations are visible on graphed curves'
      } );
    }

    /**
     * @public
     */
    reset() {
      this.graphContentsVisibleProperty.reset();
      this.equationAccordionBoxExpandedProperty.reset();
      this.equationsVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 