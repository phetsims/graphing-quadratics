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
import ExploreViewProperties from '../view/ExploreViewProperties.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class ExploreGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

    // 'Primary Parabola', optionally followed by standard-form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem(
      model.quadraticProperty, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard-form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem(
      model.savedQuadraticProperty, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Quadratic Term', optionally followed by equation
    const quadraticTermItem = {
      stringProperty: GQGraphAccessibleListNode.createQuadraticStandardFormDescriptionProperty(
        model.quadraticTermProperty,
        GraphingQuadraticsStrings.a11y.quadraticTermStringProperty,
        GraphingQuadraticsStrings.a11y.quadraticTermEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: DerivedProperty.and( [ viewProperties.quadraticTermVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

    // 'Linear Term', optionally followed by equation
    const linearTermItem = {
      stringProperty: GQGraphAccessibleListNode.createQuadraticStandardFormDescriptionProperty(
        model.linearTermProperty,
        GraphingQuadraticsStrings.a11y.linearTermStringProperty,
        GraphingQuadraticsStrings.a11y.linearTermEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: DerivedProperty.and( [ viewProperties.linearTermVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

    // 'Constant Term', optionally followed by equation
    const constantTermItem = {
      stringProperty: GQGraphAccessibleListNode.createQuadraticStandardFormDescriptionProperty(
        model.constantTermProperty,
        GraphingQuadraticsStrings.a11y.constantTermStringProperty,
        GraphingQuadraticsStrings.a11y.constantTermEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: DerivedProperty.and( [ viewProperties.constantTermVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

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