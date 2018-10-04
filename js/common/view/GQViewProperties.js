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

  /**
   * @param {Object} [options]
   */
  class GQViewProperties {

    constructor( options ) {

      options = _.extend( {
        equationForm: 'standard', // see GQConstants.EQUATION_FORMS
        graphContentsVisible: true,
        equationsVisible: GQQueryParameters.checkAll,
        coordinatesVisible: true,
        equationAccordionBoxExpanded: true,
        tandem: Tandem.required
      }, options );

      assert && assert( GQConstants.EQUATION_FORMS.includes( options.equationForm ),
        'invalid equationForm: ' + options.equationForm );

      // @public form of equations used to label lines
      this.equationForm = options.equationForm;

      // @public
      this.graphContentsVisibleProperty = new BooleanProperty( options.graphContentsVisible, {
        tandem: options.tandem.createTandem( 'graphContentsVisibleProperty' ),
        phetioDocumentation: 'whether the contents of the graph are visible'
      } );

      // @public
      this.equationsVisibleProperty = new BooleanProperty( options.equationsVisible, {
        tandem: options.tandem.createTandem( 'equationsVisibleProperty' ),
        phetioDocumentation: 'whether equations are visible on the graphed lines'
      } );

      // @public
      this.coordinatesVisibleProperty = new BooleanProperty( options.coordinatesVisible, {
        tandem: options.tandem.createTandem( 'coordinatesVisibleProperty' ),
        phetioDocumentation: 'whether coordinates are visible on points and manipulators'
      } );

      // @public
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( options.equationAccordionBoxExpanded, {
        tandem: options.tandem.createTandem( 'equationAccordionBoxExpandedProperty' ),
        phetioDocumentation: 'whether the equation accordion box is expanded'
      } );
    }

    /**
     * @public
     */
    reset() {
      this.graphContentsVisibleProperty.reset();
      this.equationsVisibleProperty.reset();
      this.coordinatesVisibleProperty.reset();
      this.equationAccordionBoxExpandedProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 