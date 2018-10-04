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
  const Property = require( 'AXON/Property' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );

  class ExploreGraphNode extends GQGraphNode {

    /**
     * @param {ExploreModel} model
     * @param {ExploreViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = options || {};

      const termNodeOptions = {
        lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH
      };

      // quadratic term, y = ax^2
      const quadraticTermNode = new QuadraticNode(
        model.quadraticTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        viewProperties.equationsVisibleProperty,
        termNodeOptions );
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermNode.visible = visible; } );

      // linear term, y = bx
      const linearTermNode = new QuadraticNode(
        model.linearTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        viewProperties.equationsVisibleProperty,
        termNodeOptions );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermNode.visible = visible; } );

      // constant term, y = bx
      const constantTermNode = new QuadraticNode(
        model.constantTermProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        viewProperties.equationsVisibleProperty,
        termNodeOptions );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermNode.visible = visible; } );

      assert && assert( !options.specialLines, 'ExploreGraphNode sets specialLines' );
      options.specialLines = [ constantTermNode, linearTermNode, quadraticTermNode ]; // rendered in this order

      super( model, viewProperties, options );

      // When any term changes, rebuild the list of special lines, to maintain the correct order
      // that they will be inspected by the point tool.
      Property.multilink( [
        viewProperties.quadraticTermVisibleProperty, model.quadraticTermProperty,
        viewProperties.linearTermVisibleProperty, model.linearTermProperty,
        viewProperties.constantTermVisibleProperty, model.constantTermProperty
      ], (
        quadraticTermVisible, quadraticTerm,
        linearTermVisible, linearTerm,
        constantTermVisible, constantTerm
      ) => {
        model.specialLines.clear();
        quadraticTermVisible && model.specialLines.add( quadraticTerm );
        linearTermVisible && model.specialLines.add( linearTerm );
        constantTermVisible && model.specialLines.add( constantTerm );
      } );
    }
  }

  return graphingQuadratics.register( 'ExploreGraphNode', ExploreGraphNode );
} );