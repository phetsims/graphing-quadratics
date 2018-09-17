// Copyright 2018, University of Colorado Boulder

/**
 * View for a scene in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreAccordionBox = require( 'GRAPHING_QUADRATICS/explore/view/ExploreAccordionBox' );
  const ExploreGraphControls = require( 'GRAPHING_QUADRATICS/explore/view/ExploreGraphControls' );
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class ExploreSceneNode extends GQSceneNode {

    /**
     * @param {ExploreScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,
        new ExploreAccordionBox( scene, viewProperties ),
        new ExploreGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'ExploreSceneNode', ExploreSceneNode );
} );