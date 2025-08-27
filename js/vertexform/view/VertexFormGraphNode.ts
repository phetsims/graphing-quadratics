// Copyright 2018-2025, University of Colorado Boulder

/**
 * VertexFormGraphNode is the graph for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import AxisOfSymmetryNode from '../../common/view/AxisOfSymmetryNode.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import VertexManipulator from '../../common/view/VertexManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import VertexFormModel from '../model/VertexFormModel.js';
import VertexFormViewProperties from './VertexFormViewProperties.js';
import VertexFormGraphAccessibleListNode from '../description/VertexFormGraphAccessibleListNode.js';

export default class VertexFormGraphNode extends GQGraphNode {

  public constructor( model: VertexFormModel, viewProperties: VertexFormViewProperties, tandem: Tandem ) {

    const axisOfSymmetryVisibleProperty = viewProperties.axisOfSymmetryVisibleProperty!;
    assert && assert( axisOfSymmetryVisibleProperty );
    const coordinatesVisibleProperty = viewProperties.coordinatesVisibleProperty!;
    assert && assert( coordinatesVisibleProperty );
    const vertexVisibleProperty = viewProperties.vertexVisibleProperty!;
    assert && assert( vertexVisibleProperty );

    // Axis of symmetry
    const axisOfSymmetryNode = new AxisOfSymmetryNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      axisOfSymmetryVisibleProperty,
      viewProperties.equationsVisibleProperty );

    // Vertex
    const vertexManipulator = new VertexManipulator(
      model.hProperty,
      model.kProperty,
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      vertexVisibleProperty,
      coordinatesVisibleProperty, {
        tandem: tandem.createTandem( 'vertexManipulator' ),
        phetioDocumentation: 'manipulator for the vertex'
      } );

    super( model, viewProperties, {
      otherCurves: [ axisOfSymmetryNode ],
      decorations: [ vertexManipulator ],
      tandem: tandem
    } );

    // Describes what is currently shown on the graph.
    const accessibleListNode = new VertexFormGraphAccessibleListNode( model, viewProperties );
    this.addChild( accessibleListNode );

    this.pdomOrder = [ vertexManipulator, accessibleListNode ];
  }
}

graphingQuadratics.register( 'VertexFormGraphNode', VertexFormGraphNode );