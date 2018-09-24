// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryNode = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class VertexFormGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = options || {};

      // Axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode( model.quadraticProperty, model.graph.yRange,
        model.modelViewTransform, viewProperties.axisOfSymmetryVisibleProperty, viewProperties.equationsVisibleProperty );

      // Vertex
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      assert && assert( !options.specialLines, 'VertexFormGraphNode sets specialLines' );
      options.specialLines = [ axisOfSymmetryNode ];

      assert && assert( !options.decorations, 'VertexFormGraphNode sets decorations' );
      options.decorations = [ vertexManipulator ];

      super( model, viewProperties.graphContentsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphNode', VertexFormGraphNode );
} );