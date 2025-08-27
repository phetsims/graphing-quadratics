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
    return GQGraphAccessibleListNode.createParabolaStandardFormItem(
        quadraticProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaStringProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaEquationStringProperty,
        equationsVisibleProperty,
        graphContentsVisibleProperty );
  }

  /**
   * 'Saved Parabola', optionally followed by standard form equation.
   */
  protected static createSavedParabolaStandardFormItem( savedQuadraticProperty: TReadOnlyProperty<Quadratic | null>,
                                                        equationsVisibleProperty: TReadOnlyProperty<boolean>,
                                                        graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return GQGraphAccessibleListNode.createParabolaStandardFormItem(
      savedQuadraticProperty,
      GraphingQuadraticsStrings.a11y.savedParabolaStringProperty,
      GraphingQuadraticsStrings.a11y.savedParabolaEquationStringProperty,
      equationsVisibleProperty,
      graphContentsVisibleProperty );
  }

  /**
   * Description of a parabola in standard form, optionally followed by standard form equation.
   */
  private static createParabolaStandardFormItem( quadraticProperty: TReadOnlyProperty<Quadratic | null>,
                                                 nameStringProperty: TReadOnlyProperty<string>,
                                                 nameEquationStringProperty: TReadOnlyProperty<string>,
                                                 equationsVisibleProperty: TReadOnlyProperty<boolean>,
                                                 graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {
    return {
      stringProperty: new DerivedStringProperty(
        [
          quadraticProperty,
          equationsVisibleProperty,
          nameStringProperty,
          nameEquationStringProperty,
          GraphingQuadraticsStrings.yStringProperty,
          GraphingQuadraticsStrings.xStringProperty,
          GraphingQuadraticsStrings.a11y.squaredStringProperty,
          GraphingQuadraticsStrings.a11y.equalsStringProperty,
          GraphingQuadraticsStrings.a11y.plusStringProperty,
          GraphingQuadraticsStrings.a11y.minusStringProperty,
          GraphingQuadraticsStrings.a11y.negativeStringProperty
        ],
        ( quadratic, equationsVisible, nameString, nameEquationString, yString, xString,
          squaredString, equalsString, plusString, minusString, negativeString ) => {
          if ( quadratic ) {
            if ( equationsVisible ) {
              return StringUtils.fillIn( nameEquationString, {
                equation: GQEquationDescriber.createStandardForm( quadratic, yString, xString, squaredString, equalsString, plusString, minusString, negativeString )
              } );
            }
            else {
              return nameString;
            }
          }
          else {
            return '';
          }
        } ),
      visibleProperty: new DerivedProperty( [ graphContentsVisibleProperty, quadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };
  }
}

graphingQuadratics.register( 'GQGraphAccessibleListNode', GQGraphAccessibleListNode );