// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on the graph
 * in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/view/GQGraphAccessibleListNode.js';
import StandardFormModel from '../model/StandardFormModel.js';
import StandardFormViewProperties from './StandardFormViewProperties.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class StandardFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createParabolaStandardFormItem(
      model.quadraticProperty,
      GraphingQuadraticsStrings.a11y.primaryParabolaStringProperty,
      GraphingQuadraticsStrings.a11y.primaryParabolaEquationStringProperty,
      viewProperties.equationsVisibleProperty,
      viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createParabolaStandardFormItem(
      model.savedQuadraticProperty,
      GraphingQuadraticsStrings.a11y.savedParabolaStringProperty,
      GraphingQuadraticsStrings.a11y.savedParabolaEquationStringProperty,
      viewProperties.equationsVisibleProperty,
      viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 vertexItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 axisOfSymmetryItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 rootsItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'StandardFormGraphAccessibleListNode', StandardFormGraphAccessibleListNode );