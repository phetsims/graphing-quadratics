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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  /**
   * @param {Object} [options]
   */
  class GQViewProperties {

    constructor( options ) {

      options = _.extend( {
        equationForm: 'standard',
        graphContentsVisible: true,
        equationsVisible: true,
        coordinatesVisible: true,
        equationAccordionBoxExpanded: true
      }, options );

      assert && assert( options.equationForm === 'standard' || options.equationForm === 'vertex',
        'invalid equationForm: ' + options.equationForm );

      // @public form of equations used to label lines
      this.equationForm = options.equationForm;

      // @public whether the contents of the graph are visible
      this.graphContentsVisibleProperty = new BooleanProperty( options.graphContentsVisible );

      // @public whether equations are visible on the graph
      this.equationsVisibleProperty = new BooleanProperty( options.equationsVisible );

      // @public whether coordinates are visible on points and manipulators
      this.coordinatesVisibleProperty = new BooleanProperty( options.coordinatesVisible );

      // @public whether the equation accordion box is expanded
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( options.equationAccordionBoxExpanded );
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

 