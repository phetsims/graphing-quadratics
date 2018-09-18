// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties that are common to all screens.
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
        graphContentsVisible: true,
        equationAccordionBoxExpanded: true
      }, options );

      // @public whether the contents of the graph are visible
      this.graphContentsVisibleProperty = new BooleanProperty( options.graphContentsVisible );

      // @public whether the equation accordion box is expanded
      this.equationAccordionBoxExpandedProperty = new BooleanProperty( options.equationAccordionBoxExpanded );
    }

    /**
     * @public
     */
    reset() {
      this.graphContentsVisibleProperty.reset();
      this.equationAccordionBoxExpandedProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
} );

 