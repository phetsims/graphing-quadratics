// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Integers' scene of the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const IntegersGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersGraphControls' );
  const IntegersInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersInteractiveEquationNode' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );

  class IntegersSceneNode extends GQSceneNode {

    /**
     * @param {StandardFormScene} scene
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
        new IntegersGraphControls( viewProperties ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'IntegersSceneNode', IntegersSceneNode );
} );