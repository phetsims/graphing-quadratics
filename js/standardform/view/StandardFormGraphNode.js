// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AxisOfSymmetryNode from '../../common/view/AxisOfSymmetryNode.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import NoRealRootsNode from './NoRealRootsNode.js';
import RootsNode from './RootsNode.js';
import VertexNode from './VertexNode.js';

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
        tandem: tandem.createTandem( 'rootsNode' )
      } );

    // Vertex
    const vertexNode = new VertexNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.vertexVisibleProperty,
      viewProperties.coordinatesVisibleProperty, {
        tandem: tandem.createTandem( 'vertexNode' )
      } );

    // 'NO REAL ROOTS' label
    const noRealRootsNode = new NoRealRootsNode(
      viewProperties.rootsVisibleProperty,
      viewProperties.vertexVisibleProperty,
      viewProperties.coordinatesVisibleProperty,
      model.quadraticProperty,
      model.modelViewTransform, {
        tandem: tandem.createTandem( 'noRealRootsNode' )
      } );

    assert && assert( !options.otherCurves, 'StandardFormGraphNode sets otherCurves' );
    options.otherCurves = [ axisOfSymmetryNode ];

    assert && assert( !options.decorations, 'StandardFormGraphNode sets decorations' );
    options.decorations = [ rootsNode, vertexNode, noRealRootsNode ]; // rendered in this order

    super( model, viewProperties, options );
  }
}

graphingQuadratics.register( 'StandardFormGraphNode', StandardFormGraphNode );
export default StandardFormGraphNode;