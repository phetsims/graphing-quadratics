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
     * @param {VertexFormModel} model
     * @param {VertexFormViewProperties} viewProperties
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( model, viewProperties, tandem, options ) {

      // We do NOT want to instrument the graph, so tandem is not propagated via options
      options = options || {};

      // Axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.axisOfSymmetryVisibleProperty,
        viewProperties.equationsVisibleProperty );

      // Vertex
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hProperty,
        model.kProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'vertexManipulator' ),
          phetioDocumentation: 'manipulator for the vertex'
        } );

      assert && assert( !options.otherCurves, 'VertexFormGraphNode sets otherCurves' );
      options.otherCurves = [ axisOfSymmetryNode ];

      assert && assert( !options.decorations, 'VertexFormGraphNode sets decorations' );
      options.decorations = [ vertexManipulator ];

      super( model, viewProperties, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphNode', VertexFormGraphNode );
} );