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
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GQDescriptionUtils from '../../common/GQDescriptionUtils.js';

export default class ExploreGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: ExploreModel, viewProperties: ExploreViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = {
      stringProperty: new DerivedStringProperty(
        [
          model.quadraticProperty,
          viewProperties.equationsVisibleProperty,
          GraphingQuadraticsStrings.a11y.primaryParabolaStringProperty,
          GraphingQuadraticsStrings.a11y.primaryParabolaEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty
        ],
        ( quadratic, equationsVisible, primaryParabolaString, primaryParabolaEquationString, yString, xString ) => {
          if ( equationsVisible ) {
            return StringUtils.fillIn( primaryParabolaEquationString, {
              equation: GQDescriptionUtils.getStandardFormDescription( quadratic )
            } );
          }
          else {
            return primaryParabolaString;
          }
        } ),
      visibleProperty: viewProperties.graphContentsVisibleProperty
    };

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = {
      stringProperty: new DerivedStringProperty(
        [
          model.savedQuadraticProperty,
          viewProperties.equationsVisibleProperty,
          GraphingQuadraticsStrings.a11y.savedParabolaStringProperty,
          GraphingQuadraticsStrings.a11y.savedParabolaEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty
        ],
        ( savedQuadratic, equationsVisible, savedParabolaString, savedParabolaEquationString, yString, xString ) => {
          if ( savedQuadratic ) {
            if ( equationsVisible ) {
              return StringUtils.fillIn( savedParabolaEquationString, {
                equation: GQDescriptionUtils.getStandardFormDescription( savedQuadratic )
              } );
            }
            else {
              return savedParabolaString;
            }
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
        [
          model.quadraticProperty,
          viewProperties.equationsVisibleProperty,
          GraphingQuadraticsStrings.a11y.quadraticTermStringProperty,
          GraphingQuadraticsStrings.a11y.quadraticTermEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty
        ],
        ( quadratic, equationsVisible, quadraticTermString, quadraticTermEquationString, yString, xString ) => {
          if ( equationsVisible ) {
            return StringUtils.fillIn( quadraticTermEquationString, {
              equation: GQDescriptionUtils.getQuadraticTermDescription( quadratic )
            } );
          }
          else {
            return quadraticTermString;
          }
        } ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.quadraticTermVisibleProperty ] )
    };

    const linearTermItem = {
      stringProperty: new DerivedStringProperty(
        [
          model.quadraticProperty,
          viewProperties.equationsVisibleProperty,
          GraphingQuadraticsStrings.a11y.linearTermStringProperty,
          GraphingQuadraticsStrings.a11y.linearTermEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty
        ],
        ( quadratic, equationsVisible, linearTermString, linearTermEquationString, yString, xString ) => {
          if ( equationsVisible ) {
            return StringUtils.fillIn( linearTermEquationString, {
              equation: GQDescriptionUtils.getLinearTermDescription( quadratic )
            } );
          }
          else {
            return linearTermString;
          }
        } ),
      visibleProperty: DerivedProperty.and( [ viewProperties.graphContentsVisibleProperty, viewProperties.linearTermVisibleProperty ] )
    };

    const constantTermItem = {
      stringProperty: new DerivedStringProperty(
        [
          model.quadraticProperty,
          viewProperties.equationsVisibleProperty,
          GraphingQuadraticsStrings.a11y.constantTermStringProperty,
          GraphingQuadraticsStrings.a11y.constantTermEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty
        ],
        ( quadratic, equationsVisible, constantTermString, constantTermEquationString, yString, xString ) => {
          if ( equationsVisible ) {
            return StringUtils.fillIn( constantTermEquationString, {
              equation: GQDescriptionUtils.getConstantTermDescription( quadratic )
            } );
          }
          else {
            return constantTermString;
          }
        } ),
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