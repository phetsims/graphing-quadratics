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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  class GQViewProperties {

    constructor( tandem, options ) {

      options = _.extend( {
        equationForm: 'standard', // see GQConstants.EQUATION_FORMS
        graphContentsVisible: true,
        equationsVisible: true,
        coordinatesVisible: true,
        equationAccordionBoxExpanded: true
      }, options );

      assert && assert( GQConstants.EQUATION_FORMS.includes( options.equationForm ),
        'invalid equationForm: ' + options.equationForm );

      // @public form of equations used to label lines
      this.equationForm = options.equationForm;

      // @public
      this.graphContentsVisibleProperty = new BooleanProperty( options.graphContentsVisible, {
        tandem: tandem.createTandem( 'graphContentsVisibleProperty' ),
        phetioInstanceDocumentation: 'whether the contents of the graph are visible'
      } );

      // @public
      this.equationsVisibleProperty = new BooleanProperty( options.equationsVisible, {
        tandem: tandem.createTandem( 'equationsVisibleProperty' ),
        phetioInstanceDocumentation: 'whether equations are visible on the graphed lines'
      } );

      // @public
      this.coordinatesVisibleProperty = new BooleanProperty( options.coordinatesVisible, {
        tandem: tandem.createTandem( 'coordinatesVisibleProperty' ),
        phetioInstanceDocumentation: 'whether coordinates are visible on points and manipulators'
      } );

      // @public
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( options.equationAccordionBoxExpanded, {
        tandem: tandem.createTandem( 'equationAccordionBoxExpandedProperty' ),
        phetioInstanceDocumentation: 'whether the equation accordion box is expanded'
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

 