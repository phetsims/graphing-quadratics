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
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );

  class ExploreGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {ExploreViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = options || {};

      // constant term, y = bx
      const constantTermNode = new QuadraticNode( model.constantTermProperty, model.graph, model.modelViewTransform );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermNode.visible = visible; } );

      // linear term, y = bx
      const linearTermNode = new QuadraticNode( model.linearTermProperty, model.graph, model.modelViewTransform );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermNode.visible = visible; } );

      // quadratic term, y = ax^2
      const quadraticTermNode = new QuadraticNode( model.quadraticTermProperty, model.graph, model.modelViewTransform );
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermNode.visible = visible; } );

      assert && assert( !options.specialLines, 'ExploreGraphNode sets specialLines' );
      options.specialLines = [ constantTermNode, linearTermNode, quadraticTermNode ];

      super( model, viewProperties, options );
    }
  }

  return graphingQuadratics.register( 'ExploreGraphNode', ExploreGraphNode );
} );