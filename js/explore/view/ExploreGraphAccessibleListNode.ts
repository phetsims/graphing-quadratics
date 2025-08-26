// Copyright 2025, University of Colorado Boulder

/**
 * ExploreGraphAccessibleListNode is the dynamic description of what is shown on the graph in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AccessibleListNode, { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import ExploreModel from '../model/ExploreModel.js';
import ExploreViewProperties from './ExploreViewProperties.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class ExploreGraphAccessibleListNode extends AccessibleListNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

    const leadingParagraphStringProperty = new DerivedStringProperty( [ viewProperties.graphContentsVisibleProperty ],
      graphContentsVisible => graphContentsVisible ?
                              'Coordinate grid currently contains:' :
                              'The contents of the coordinate grid are hidden.' );

    const primaryParabolaItem = {
      stringProperty: new StringProperty( 'Primary Parabola' ),
      visibleProperty: viewProperties.graphContentsVisibleProperty
    };

    const savedParabolaItem = {
      stringProperty: new StringProperty( 'Saved Parabola' ),
      visibleProperty: new DerivedProperty(
        [ viewProperties.graphContentsVisibleProperty, model.savedQuadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };

    const quadraticTermItem = {
      stringProperty: new StringProperty( 'Quadratic Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.quadraticTermVisibleProperty ] )
    };

    const linearTermItem = {
      stringProperty: new StringProperty( 'Linear Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.linearTermVisibleProperty ] )
    };

    const constantTermItem = {
      stringProperty: new StringProperty( 'Constant Term' ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.constantTermVisibleProperty ] )
    };

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      quadraticTermItem,
      linearTermItem,
      constantTermItem
    ];

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }
}

graphingQuadratics.register( 'ExploreGraphAccessibleListNode', ExploreGraphAccessibleListNode );