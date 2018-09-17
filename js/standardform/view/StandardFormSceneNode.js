// Copyright 2018, University of Colorado Boulder

/**
 * View for a scene in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormAccordionBox = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormAccordionBox' );
  const StandardFormGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphControls' );

  class StandardFormSceneNode extends GQSceneNode {

    /**
     * @param {StandardFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,
        new StandardFormAccordionBox( scene, viewProperties ),
        new StandardFormGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'StandardFormSceneNode', StandardFormSceneNode );
} );