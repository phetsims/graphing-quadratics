// Copyright 2018-2025, University of Colorado Boulder

/**
 * StandardFormGraphNode is the graph for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import AxisOfSymmetryNode from '../../common/view/AxisOfSymmetryNode.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormModel from '../model/StandardFormModel.js';
import NoRealRootsNode from './NoRealRootsNode.js';
import RootsNode from './RootsNode.js';
import StandardFormViewProperties from './StandardFormViewProperties.js';
import VertexNode from './VertexNode.js';
import StandardFormGraphAccessibleListNode from '../description/StandardFormGraphAccessibleListNode.js';

export default class StandardFormGraphNode extends GQGraphNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties, tandem: Tandem ) {

    const axisOfSymmetryVisibleProperty = viewProperties.axisOfSymmetryVisibleProperty!;
    assert && assert( axisOfSymmetryVisibleProperty );
    const coordinatesVisibleProperty = viewProperties.coordinatesVisibleProperty!;
    assert && assert( coordinatesVisibleProperty );
    const vertexVisibleProperty = viewProperties.vertexVisibleProperty!;
    assert && assert( vertexVisibleProperty );

    // Axis of symmetry line
    const axisOfSymmetryNode = new AxisOfSymmetryNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      axisOfSymmetryVisibleProperty,
      viewProperties.equationsVisibleProperty );

    // Roots
    const rootsNode = new RootsNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.rootsVisibleProperty,
      coordinatesVisibleProperty,
      tandem.createTandem( 'rootsNode' )
    );

    // Vertex
    const vertexNode = new VertexNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      vertexVisibleProperty,
      coordinatesVisibleProperty,
      tandem.createTandem( 'vertexNode' )
    );

    // 'NO REAL ROOTS' label
    const noRealRootsNode = new NoRealRootsNode(
      viewProperties.rootsVisibleProperty,
      vertexVisibleProperty,
      coordinatesVisibleProperty,
      model.quadraticProperty,
      model.modelViewTransform,
      tandem.createTandem( 'noRealRootsNode' )
    );

    super( model, viewProperties, {
      otherCurves: [ axisOfSymmetryNode ],
      decorations: [ rootsNode, vertexNode, noRealRootsNode ], // rendered in this order
      tandem: tandem
    } );

    // Describes what is currently shown on the graph.
    this.addChild( new StandardFormGraphAccessibleListNode( model, viewProperties ) );
  }
}

graphingQuadratics.register( 'StandardFormGraphNode', StandardFormGraphNode );