// Copyright 2025-2026, University of Colorado Boulder

/**
 * VertexFormGraphDescriptionNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import GQGraphDescriptionNode from '../../../common/view/description/GQGraphDescriptionNode.js';
import VertexFormModel from '../../model/VertexFormModel.js';
import VertexFormViewProperties from '../VertexFormViewProperties.js';

export default class VertexFormGraphDescriptionNode extends GQGraphDescriptionNode {

  public constructor( model: VertexFormModel, viewProperties: VertexFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphDescriptionNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphDescriptionNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Movable vertex', optionally followed by coordinates
    const movableVertexItem = GQGraphDescriptionNode.createMovableVertexItem( model.quadraticProperty,
      viewProperties.coordinatesVisibleProperty, viewProperties.vertexVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Axis of Symmetry', optionally followed by equation.
    // Note that there the axis of symmetry will be undefined when a = 0.
    const axisOfSymmetryItem = GQGraphDescriptionNode.createAxisOfSymmetryItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.axisOfSymmetryVisibleProperty, viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      movableVertexItem,
      axisOfSymmetryItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}
