// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on the graph
 * in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import StandardFormModel from '../model/StandardFormModel.js';
import StandardFormViewProperties from '../view/StandardFormViewProperties.js';

export default class StandardFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Axis of Symmetry', optionally followed by equation.
    // Note that there will be no axis of symmetry when a = 0, because y = bx + c is a line, not a parabola.
    assert && assert( viewProperties.axisOfSymmetryVisibleProperty, 'expected axisOfSymmetryVisibleProperty to be defined' );
    const axisOfSymmetryItem = GQGraphAccessibleListNode.createAxisOfSymmetryItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.axisOfSymmetryVisibleProperty!, viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 vertexItem
      axisOfSymmetryItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 rootsItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'StandardFormGraphAccessibleListNode', StandardFormGraphAccessibleListNode );