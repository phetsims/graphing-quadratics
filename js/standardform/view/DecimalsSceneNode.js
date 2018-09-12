// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Decimals' scene of the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const DecimalsAccordionBox = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsAccordionBox' );
  const DecimalsGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsGraphControls' );

  class DecimalsSceneNode extends GQSceneNode {

    /**
     * @param {StandardFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,
        new DecimalsAccordionBox( scene, viewProperties ),
        new DecimalsGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'DecimalsSceneNode', DecimalsSceneNode );
} );