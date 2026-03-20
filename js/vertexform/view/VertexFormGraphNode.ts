// Copyright 2018-2026, University of Colorado Boulder

/**
 * VertexFormGraphNode is the graph for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import AxisOfSymmetryNode from '../../common/view/AxisOfSymmetryNode.js';
import GQGraphNode from '../../common/view/GQGraphNode.js';
import VertexManipulator from '../../common/view/VertexManipulator.js';
import VertexFormModel from '../model/VertexFormModel.js';
import VertexFormGraphDescriptionNode from './description/VertexFormGraphDescriptionNode.js';
import VertexFormViewProperties from './VertexFormViewProperties.js';

export default class VertexFormGraphNode extends GQGraphNode {

  public constructor( model: VertexFormModel, viewProperties: VertexFormViewProperties, tandem: Tandem ) {

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

    super( model, viewProperties, {
      otherCurves: [ axisOfSymmetryNode ],
      decorations: [ vertexManipulator ],
      tandem: tandem
    } );

    // Describes what is currently shown on the graph.
    // This is an old pattern that should not be followed. Setting option accessibleTemplate is preferred.
    // See https://github.com/phetsims/scenery-phet/issues/973.
    const descriptionNode = new VertexFormGraphDescriptionNode( model, viewProperties );
    this.addChild( descriptionNode );

    this.pdomOrder = [ vertexManipulator, descriptionNode ];
  }
}
