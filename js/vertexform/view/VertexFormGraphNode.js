// Copyright 2018-2020, University of Colorado Boulder

/**
 * Graph for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AxisOfSymmetryNode from '../../common/view/AxisOfSymmetryNode.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import VertexManipulator from '../../common/view/VertexManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';

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
      model.hProperty,
      model.kProperty,
      model.quadraticProperty,
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

graphingQuadratics.register( 'VertexFormGraphNode', VertexFormGraphNode );
export default VertexFormGraphNode;