// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Integers' scene of the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const IntegersAccordionBox = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersAccordionBox' );
  const IntegersGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersGraphControls' );

  class IntegersSceneNode extends GQSceneNode {

    /**
     * @param {StandardFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,
        new IntegersAccordionBox( scene, viewProperties ),
        new IntegersGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'IntegersSceneNode', IntegersSceneNode );
} );