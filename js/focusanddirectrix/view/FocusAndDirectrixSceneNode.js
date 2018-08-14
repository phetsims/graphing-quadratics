// Copyright 2018, University of Colorado Boulder

/**
 * View for the sole scene of the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const FocusAndDirectrixGraphControls = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixGraphControls' );
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const IntegersInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersInteractiveEquationNode' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );

  class FocusAndDirectrixSceneNode extends GQSceneNode {

    /**
     * @param {FocusAndDirectrixScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} options
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,

        // standard form of the equation, title of accordion box
        new StandardFormEquationNode(),

        // interactive equation, in the accordion box
        new IntegersInteractiveEquationNode( scene.quadraticProperty, scene.aRange, scene.bRange, scene.cRange ),

        // controls related to the graph
        new FocusAndDirectrixGraphControls( viewProperties ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixSceneNode', FocusAndDirectrixSceneNode );
} );