// Copyright 2025, University of Colorado Boulder

/**
 * ExploreGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import GQGraphDescriptionNode from '../../../common/view/description/GQGraphDescriptionNode.js';
import graphingQuadratics from '../../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../../GraphingQuadraticsStrings.js';
import ExploreModel from '../../model/ExploreModel.js';
import ExploreViewProperties from '../ExploreViewProperties.js';

export default class ExploreGraphAccessibleListNode extends GQGraphDescriptionNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

    // 'Primary Parabola', optionally followed by standard-form equation
    const primaryParabolaItem = GQGraphDescriptionNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard-form equation
    const savedParabolaItem = GQGraphDescriptionNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Quadratic Term', optionally followed by equation
    const quadraticTermItem = {
      stringProperty: GQGraphDescriptionNode.createQuadraticStandardFormDescriptionProperty(
        model.quadraticTermProperty,
        GraphingQuadraticsStrings.a11y.quadraticTermStringProperty,
        GraphingQuadraticsStrings.a11y.quadraticTermAtEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: DerivedProperty.and( [ viewProperties.quadraticTermVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

    // 'Linear Term', optionally followed by equation
    const linearTermItem = {
      stringProperty: GQGraphDescriptionNode.createQuadraticStandardFormDescriptionProperty(
        model.linearTermProperty,
        GraphingQuadraticsStrings.a11y.linearTermStringProperty,
        GraphingQuadraticsStrings.a11y.linearTermAtEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: DerivedProperty.and( [ viewProperties.linearTermVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

    // 'Constant Term', optionally followed by equation
    const constantTermItem = {
      stringProperty: GQGraphDescriptionNode.createQuadraticStandardFormDescriptionProperty(
        model.constantTermProperty,
        GraphingQuadraticsStrings.a11y.constantTermStringProperty,
        GraphingQuadraticsStrings.a11y.constantTermAtEquationStringProperty,
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