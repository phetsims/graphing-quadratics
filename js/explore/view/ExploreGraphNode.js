// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
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

      const termNodeOptions = {
        lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH
      };

      // constant term, y = bx
      const constantTermNode = new QuadraticNode(
        model.constantTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        termNodeOptions );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermNode.visible = visible; } );

      // linear term, y = bx
      const linearTermNode = new QuadraticNode(
        model.linearTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        termNodeOptions );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermNode.visible = visible; } );

      // quadratic term, y = ax^2
      const quadraticTermNode = new QuadraticNode(
        model.quadraticTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        termNodeOptions );
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermNode.visible = visible; } );

      assert && assert( !options.specialLines, 'ExploreGraphNode sets specialLines' );
      options.specialLines = [ constantTermNode, linearTermNode, quadraticTermNode ];

      super( model, viewProperties.graphContentsVisibleProperty, viewProperties.equationForm, options );
    }
  }

  return graphingQuadratics.register( 'ExploreGraphNode', ExploreGraphNode );
} );