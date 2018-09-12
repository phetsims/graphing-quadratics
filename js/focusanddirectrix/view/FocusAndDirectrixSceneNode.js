// Copyright 2018, University of Colorado Boulder

/**
 * View for the sole scene of the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixAccordionBox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixAccordionBox' );
  const FocusAndDirectrixGraphControls = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixGraphControls' );
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class FocusAndDirectrixSceneNode extends GQSceneNode {

    /**
     * @param {FocusAndDirectrixScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {

      options = options || {};

      assert && assert( options.pointToolsVisible === undefined, 'FocusAndDirectrixSceneNode sets pointToolsVisible' );
      options.pointToolsVisible = false;

      super( scene, layoutBounds, viewProperties,
        new FocusAndDirectrixAccordionBox( scene, viewProperties ),
        new FocusAndDirectrixGraphControls( viewProperties ),
        options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixSceneNode', FocusAndDirectrixSceneNode );
} );