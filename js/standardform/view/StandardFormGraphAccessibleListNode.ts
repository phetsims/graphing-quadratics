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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class StandardFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = {
      stringProperty: GQGraphAccessibleListNode.createParabolaStandardFormStringProperty(
        model.quadraticProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaStringProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: viewProperties.graphContentsVisibleProperty
    };

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = {
      stringProperty: GQGraphAccessibleListNode.createParabolaStandardFormStringProperty(
        model.savedQuadraticProperty,
        GraphingQuadraticsStrings.a11y.savedParabolaStringProperty,
        GraphingQuadraticsStrings.a11y.savedParabolaEquationStringProperty,
        viewProperties.equationsVisibleProperty ),
      visibleProperty: new DerivedProperty(
        [ viewProperties.graphContentsVisibleProperty, model.savedQuadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };

    assert && assert( viewProperties.axisOfSymmetryVisibleProperty, 'expected axisOfSymmetryVisibleProperty to be defined' );
    const axisOfSymmetryItem = {
      stringProperty: GQGraphAccessibleListNode.createAxisOfSymmetryStringProperty( model.quadraticProperty, viewProperties.equationsVisibleProperty ),
      visibleProperty: new DerivedProperty( [
          model.quadraticProperty,
          viewProperties.graphContentsVisibleProperty,
          viewProperties.axisOfSymmetryVisibleProperty!
        ],
        ( quadratic, graphContentsVisible, axisOfSymmetryVisible ) => ( quadratic.axisOfSymmetry !== undefined ) && graphContentsVisible && axisOfSymmetryVisible )
    };

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