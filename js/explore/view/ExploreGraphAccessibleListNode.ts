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
import GQEquationDescriber from '../../common/view/GQEquationDescriber.js';
import Quadratic from '../../common/model/Quadratic.js';

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
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( quadratic, equationsVisible, primaryParabolaString, primaryParabolaEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( equationsVisible ) {
            return StringUtils.fillIn( primaryParabolaEquationString, {
              equation: GQEquationDescriber.createStandardForm( quadratic, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
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
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( savedQuadratic, equationsVisible, savedParabolaString, savedParabolaEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( savedQuadratic ) {
            if ( equationsVisible ) {
              return StringUtils.fillIn( savedParabolaEquationString, {
                equation: GQEquationDescriber.createStandardForm( savedQuadratic, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
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
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( quadratic, equationsVisible, quadraticTermString, quadraticTermEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( equationsVisible ) {
            const quadraticTerm = new Quadratic( quadratic.a, 0, 0 );
            return StringUtils.fillIn( quadraticTermEquationString, {
              equation: GQEquationDescriber.createStandardForm( quadraticTerm, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
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
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( quadratic, equationsVisible, linearTermString, linearTermEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( equationsVisible ) {
            const linearTerm = new Quadratic( 0, quadratic.b, 0 );
            return StringUtils.fillIn( linearTermEquationString, {
              equation: GQEquationDescriber.createStandardForm( linearTerm, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
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
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( quadratic, equationsVisible, constantTermString, constantTermEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( equationsVisible ) {
            const constantTerm = new Quadratic( 0, 0, quadratic.c );
            return StringUtils.fillIn( constantTermEquationString, {
              equation: GQEquationDescriber.createStandardForm( constantTerm, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
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