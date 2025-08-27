// Copyright 2025, University of Colorado Boulder

/**
 * ExploreGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on the graph
 * in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import ExploreModel from '../model/ExploreModel.js';
import ExploreViewProperties from './ExploreViewProperties.js';
import GQGraphAccessibleListNode from '../../common/view/GQGraphAccessibleListNode.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class ExploreGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

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

    // 'Quadratic Term', optionally followed by equation
    const quadraticTermItem = GQGraphAccessibleListNode.createParabolaStandardFormItem(
      model.quadraticTermProperty,
      GraphingQuadraticsStrings.a11y.quadraticTermStringProperty,
      GraphingQuadraticsStrings.a11y.quadraticTermEquationStringProperty,
      viewProperties.equationsVisibleProperty,
      viewProperties.graphContentsVisibleProperty );

    // 'Linear Term', optionally followed by equation
    const linearTermItem = GQGraphAccessibleListNode.createParabolaStandardFormItem(
      model.linearTermProperty,
      GraphingQuadraticsStrings.a11y.linearTermStringProperty,
      GraphingQuadraticsStrings.a11y.linearTermEquationStringProperty,
      viewProperties.equationsVisibleProperty,
      viewProperties.graphContentsVisibleProperty );

    // 'Constant Term', optionally followed by equation
    const constantTermItem = GQGraphAccessibleListNode.createParabolaStandardFormItem(
      model.constantTermProperty,
      GraphingQuadraticsStrings.a11y.constantTermStringProperty,
      GraphingQuadraticsStrings.a11y.constantTermEquationStringProperty,
      viewProperties.equationsVisibleProperty,
      viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      quadraticTermItem,
      linearTermItem,
      constantTermItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'ExploreGraphAccessibleListNode', ExploreGraphAccessibleListNode );