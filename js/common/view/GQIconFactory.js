// Copyright 2018, University of Colorado Boulder

//TODO #11 design screen icons
/**
 * Creates icons for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  const GQIconFactory = {

    /**
     * Creates the icon for the Explore screen.
     * @returns {Node}
     */
    createExploreScreenIcon() {
      return null;
    },

    /**
     * Creates the icon for the Standard Form screen.
     * @returns {Node}
     */
    createStandardFormScreenIcon() {
      return null;
    },

    /**
     * Creates the icon for the Vertex Form screen.
     * @returns {Node}
     */
    createVertexFormScreenIcon() {
      return null;
    },

    /**
     * Creates the icon for the Focus & Directrix screen.
     * @returns {Node}
     */
    createFocusAndDirectrixScreenIcon() {
      return null;
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );