// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryNode = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryNode' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NoRealRootsNode = require( 'GRAPHING_QUADRATICS/standardform/view/NoRealRootsNode' );
  const RootsNode = require( 'GRAPHING_QUADRATICS/standardform/view/RootsNode' );
  const VertexNode = require( 'GRAPHING_QUADRATICS/standardform/view/VertexNode' );

  class StandardFormGraphNode extends GQGraphNode {

    /**
     * @param {StandardFormModel} model
     * @param {StandardFormViewProperties} viewProperties
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( model, viewProperties, tandem, options ) {

      // We do NOT want to instrument the graph, so tandem is not propagated via options
      options = options || {};

      // Axis of symmetry line
      const axisOfSymmetryNode = new AxisOfSymmetryNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.axisOfSymmetryVisibleProperty,
        viewProperties.equationsVisibleProperty );

      // Roots
      const rootsNode = new RootsNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.rootsVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'rootsNode' ),
          phetioDocumentation: 'displays the roots of the interactive quadratic'
        } );

      // Vertex
      const vertexNode = new VertexNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'vertexNode' ),
          phetioDocumentation: 'displays the vertex of the interactive quadratic'
        } );

      // 'NO REAL ROOTS' label
      const noRealRootsNode = new NoRealRootsNode(
        viewProperties.rootsVisibleProperty,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty,
        model.quadraticProperty,
        model.modelViewTransform, {
          center: model.modelViewTransform.modelToViewXY( model.graph.xRange.getCenter(), model.graph.yRange.getCenter() ),
          tandem: tandem.createTandem( 'noRealRootsNode' ),
          phetioDocumentation: 'displays NO REAL ROOTS when the interactive quadratic has no real roots'
        } );

      assert && assert( !options.otherCurves, 'StandardFormGraphNode sets otherCurves' );
      options.otherCurves = [ axisOfSymmetryNode ];

      assert && assert( !options.decorations, 'StandardFormGraphNode sets decorations' );
      options.decorations = [ rootsNode, vertexNode, noRealRootsNode ]; // rendered in this order

      super( model, viewProperties, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormGraphNode', StandardFormGraphNode );
} );