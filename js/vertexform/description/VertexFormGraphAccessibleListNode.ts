// Copyright 2025, University of Colorado Boulder

/**
 * VertexFormGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import VertexFormModel from '../model/VertexFormModel.js';
import VertexFormViewProperties from '../view/VertexFormViewProperties.js';

export default class VertexFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: VertexFormModel, viewProperties: VertexFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Movable vertex', optionally followed by coordinates
    assert && assert( viewProperties.coordinatesVisibleProperty, 'expected coordinatesVisibleProperty to be defined' );
    assert && assert( viewProperties.vertexVisibleProperty, 'expected vertexVisibleProperty to be defined' );
    const movableVertexItem = GQGraphAccessibleListNode.createMovableVertexItem( model.quadraticProperty,
      viewProperties.coordinatesVisibleProperty!, viewProperties.vertexVisibleProperty!, viewProperties.graphContentsVisibleProperty );

    // 'Axis of Symmetry', optionally followed by equation.
    // Note that there the axis of symmetry will be undefined when a = 0.
    assert && assert( viewProperties.axisOfSymmetryVisibleProperty, 'expected axisOfSymmetryVisibleProperty to be defined' );
    const axisOfSymmetryItem = GQGraphAccessibleListNode.createAxisOfSymmetryItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.axisOfSymmetryVisibleProperty!, viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      movableVertexItem,
      axisOfSymmetryItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'VertexFormGraphAccessibleListNode', VertexFormGraphAccessibleListNode );