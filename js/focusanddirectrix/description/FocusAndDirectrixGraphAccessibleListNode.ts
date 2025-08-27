// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import FocusAndDirectrixModel from '../model/FocusAndDirectrixModel.js';
import FocusAndDirectrixViewProperties from '../view/FocusAndDirectrixViewProperties.js';

export default class FocusAndDirectrixGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: FocusAndDirectrixModel, viewProperties: FocusAndDirectrixViewProperties ) {

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

    // 'Directrix', optionally followed by equation.
    const directrixItem = GQGraphAccessibleListNode.createDirectrixItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.directrixVisibleProperty, viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      movableVertexItem,
      directrixItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 pointOnParabolaItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixGraphAccessibleListNode', FocusAndDirectrixGraphAccessibleListNode );