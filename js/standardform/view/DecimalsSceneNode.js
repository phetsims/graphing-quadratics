// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Decimals' scene of the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const DecimalsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsInteractiveEquationNode' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const StandardGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/StandardGraphControls' );

  class DecimalsSceneNode extends GQSceneNode {

    /**
     * @param {StandardFormScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, viewProperties, options ) {
      super( scene, layoutBounds, viewProperties,

        // standard form of the equation, title of accordion box
        new StandardFormEquationNode(),

        // interactive equation, in the accordion box
        new DecimalsInteractiveEquationNode( scene.quadraticProperty, scene.aRange, scene.bRange, scene.cRange ),

        // controls related to the graph
        new StandardGraphControls( viewProperties ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'DecimalsSceneNode', DecimalsSceneNode );
} );