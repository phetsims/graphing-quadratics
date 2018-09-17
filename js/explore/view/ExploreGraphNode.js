// Copyright 2018, University of Colorado Boulder

/**
 * Graph view for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class ExploreGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {
      super( model, viewProperties, options );
      //TODO add Nodes and visibility listeners for quadratic terms
    }
  }

  return graphingQuadratics.register( 'ExploreGraphNode', ExploreGraphNode );
} );