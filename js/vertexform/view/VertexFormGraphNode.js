// Copyright 2018, University of Colorado Boulder

/**
 * Graph view for the 'Vertex Form' screen.
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

      super( model, viewProperties, options );

      // Axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode( model.quadraticProperty, model.graph, model.modelViewTransform );
      this.addChild( axisOfSymmetryNode );
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => { axisOfSymmetryNode.visible = visible; } );

      // Vertex
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.coordinatesVisibleProperty
      );
      this.addChild( vertexManipulator );
      viewProperties.vertexVisibleProperty.link( visible => { vertexManipulator.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphNode', VertexFormGraphNode );
} );