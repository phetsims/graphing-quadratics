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
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GQGraphAccessibleListNode from '../../common/view/GQGraphAccessibleListNode.js';

export default class ExploreGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

    const primaryParabolaItem = {
      stringProperty: new DerivedStringProperty(
        [ viewProperties.equationsVisibleProperty ],
        equationsVisible => equationsVisible ? 'Primary Parabola, y equals a x squared plus b x plus c' : 'Primary Parabola' ),
      visibleProperty: viewProperties.graphContentsVisibleProperty
    };

    const savedParabolaItem = {
      stringProperty: new DerivedStringProperty(
        [ model.savedQuadraticProperty, viewProperties.equationsVisibleProperty ],
        ( savedQuadratic, equationsVisible ) => {
          if ( savedQuadratic ) {
            return equationsVisible ? 'Saved Parabola, y equals a x squared plus b x plus c' : 'Saved Parabola';
          }
          else {
            return '';
          }
        } ),
      visibleProperty: new DerivedProperty(
        [ viewProperties.graphContentsVisibleProperty, model.savedQuadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };

    const quadraticTermItem = {
      stringProperty: new DerivedStringProperty(
        [ viewProperties.equationsVisibleProperty ],
        equationsVisible => equationsVisible ? 'Quadratic Term, y equals a x squared' : 'Quadratic Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.quadraticTermVisibleProperty ] )
    };

    const linearTermItem = {
      stringProperty: new DerivedStringProperty(
        [ viewProperties.equationsVisibleProperty ],
        equationsVisible => equationsVisible ? 'Linear Term, y equals b x' : 'Linear Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.linearTermVisibleProperty ] )
    };

    const constantTermItem = {
      stringProperty: new DerivedStringProperty(
        [ viewProperties.equationsVisibleProperty ],
        equationsVisible => equationsVisible ? 'Constant Term, y equals c' : 'Constant Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.constantTermVisibleProperty ] )
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