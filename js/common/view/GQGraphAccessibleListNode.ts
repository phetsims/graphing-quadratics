// Copyright 2025, University of Colorado Boulder

/**
 * GQGraphAccessibleListNode is the base class for dynamic description (in bullet list format) of what is shown on the graph.
 * The base class is responsible for parts of the description that are the same for all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AccessibleListNode, { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GQEquationDescriber from './GQEquationDescriber.js';
import Quadratic from '../model/Quadratic.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class GQGraphAccessibleListNode extends AccessibleListNode {

  public constructor( listItems: AccessibleListItem[], graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {

    // Lists in all screens have the same leading paragraph, depending on whether the graph contents are visible.
    const leadingParagraphStringProperty = new DerivedStringProperty( [
        graphContentsVisibleProperty,
        GraphingQuadraticsStrings.a11y.coordinateGridCurrentlyContainsStringProperty,
        GraphingQuadraticsStrings.a11y.contentsOfCoordinateGridAreHiddenStringProperty
      ],
      ( ( graphContentsVisible, coordinateGridCurrentlyContains, contentsOfCoordinateGridAreHidden ) =>
        graphContentsVisible ? coordinateGridCurrentlyContains : contentsOfCoordinateGridAreHidden ) );

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }

  /**
   * 'Primary Parabola', optionally followed by standard form equation.
   */
  protected static createPrimaryParabolaStandardFormItem( quadraticProperty: TReadOnlyProperty<Quadratic>,
                                                          equationsVisibleProperty: TReadOnlyProperty<boolean>,
                                                          graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty(
        [
          quadraticProperty,
          equationsVisibleProperty,
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
      visibleProperty: graphContentsVisibleProperty
    };
  }

  /**
   * 'Saved Parabola', optionally followed by standard form equation.
   */
  protected static createSavedParabolaStandardFormItem( savedQuadraticProperty: TReadOnlyProperty<Quadratic | null>,
                                                        equationsVisibleProperty: TReadOnlyProperty<boolean>,
                                                        graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty(
        [
          savedQuadraticProperty,
          equationsVisibleProperty,
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
      visibleProperty: new DerivedProperty( [ graphContentsVisibleProperty, savedQuadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };
  }
}

graphingQuadratics.register( 'GQGraphAccessibleListNode', GQGraphAccessibleListNode );