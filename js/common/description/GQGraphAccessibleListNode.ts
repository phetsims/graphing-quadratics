// Copyright 2025, University of Colorado Boulder

/**
 * GQGraphAccessibleListNode is the base class for dynamic description (in bullet list format) of what is shown on the graph.
 * The base class is responsible for parts of the description that are the same for all screens.
 * It also has static methods that create AccessibleListItems that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AccessibleListNode, { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Quadratic from '../model/Quadratic.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GQEquationDescriber from './GQEquationDescriber.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

export default class GQGraphAccessibleListNode extends AccessibleListNode {

  protected constructor( listItems: AccessibleListItem[], graphContentsVisibleProperty: TReadOnlyProperty<boolean> ) {

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
   * Creates an AccessibleListItem that describes the primary quadratic as it appears on the graph.
   */
  protected static createPrimaryQuadraticItem(
    quadraticProperty: TReadOnlyProperty<Quadratic>,
    equationsVisibleProperty: TReadOnlyProperty<boolean>,
    graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    return {
      stringProperty: GQGraphAccessibleListNode.createQuadraticStandardFormDescriptionProperty(
        quadraticProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaStringProperty,
        GraphingQuadraticsStrings.a11y.primaryParabolaEquationStringProperty,
        equationsVisibleProperty ),
      visibleProperty: graphContentsVisibleProperty
    };
  }

  /**
   * Creates an AccessibleListItem that describes the saved quadratic as it appears on the graph.
   */
  protected static createSavedQuadraticItem(
    savedQuadraticProperty: ReadOnlyProperty<Quadratic | null>,
    equationsVisibleProperty: TReadOnlyProperty<boolean>,
    graphContentsVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    return {
      stringProperty: GQGraphAccessibleListNode.createQuadraticStandardFormDescriptionProperty(
        savedQuadraticProperty,
        GraphingQuadraticsStrings.a11y.savedParabolaStringProperty,
        GraphingQuadraticsStrings.a11y.savedParabolaEquationStringProperty,
        equationsVisibleProperty ),
      visibleProperty: new DerivedProperty(
        [ graphContentsVisibleProperty, savedQuadraticProperty ],
        ( graphContentsVisible, savedQuadratic ) => graphContentsVisible && !!savedQuadratic )
    };
  }

  /**
   * Creates an AccessibleListItem that describes the axis of symmetry as it appears on the graph.
   */
  protected static createAxisOfSymmetryItem(
    quadraticProperty: TReadOnlyProperty<Quadratic>,
    equationsVisibleProperty: TReadOnlyProperty<boolean>,
    axisOfSymmetryVisibleProperty: TReadOnlyProperty<boolean>,
    graphContentsVisibleProperty: TReadOnlyProperty<boolean>
  ): AccessibleListItem {

    return {
      stringProperty: GQGraphAccessibleListNode.createAxisOfSymmetryDescriptionProperty( quadraticProperty, equationsVisibleProperty ),
      visibleProperty: new DerivedProperty( [
          quadraticProperty,
          axisOfSymmetryVisibleProperty,
          graphContentsVisibleProperty
        ],
        ( quadratic, axisOfSymmetryVisible, graphContentsVisible ) => ( quadratic.axisOfSymmetry !== undefined ) && axisOfSymmetryVisible && graphContentsVisible )
    };
  }

  /**
   * Creates an AccessibleListItem that describes directrix as it appears on the graph.
   */
  protected static createDirectrixItem(
    quadraticProperty: TReadOnlyProperty<Quadratic>,
    equationsVisibleProperty: TReadOnlyProperty<boolean>,
    directrixVisibleProperty: TReadOnlyProperty<boolean>,
    graphContentsVisibleProperty: TReadOnlyProperty<boolean>
  ): AccessibleListItem {

    return {
      stringProperty: GQGraphAccessibleListNode.createDirectrixDescriptionProperty( quadraticProperty, equationsVisibleProperty ),
      visibleProperty: new DerivedProperty( [
          quadraticProperty,
          directrixVisibleProperty,
          graphContentsVisibleProperty
        ],
        ( quadratic, directrixVisible, graphContentsVisible ) => ( quadratic.directrix !== undefined ) && directrixVisible && graphContentsVisible )
    };
  }

  /**
   * Description of a quadratic, optionally followed by its standard-form equation.
   */
  protected static createQuadraticStandardFormDescriptionProperty(
    quadraticProperty: TReadOnlyProperty<Quadratic | null>,
    nameStringProperty: TReadOnlyProperty<string>,
    nameEquationStringProperty: TReadOnlyProperty<string>,
    equationsVisibleProperty: TReadOnlyProperty<boolean> ): TReadOnlyProperty<string> {

    return new DerivedStringProperty(
      [
        quadraticProperty,
        equationsVisibleProperty,

        // The name given to the quadratic, with and without the associated equation.
        nameStringProperty,
        nameEquationStringProperty,

        // Other localized strings that are used in the derivation.
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
              equation: GQEquationDescriber.createStandardFormDescription( quadratic, yString, xString, squaredString,
                equalsString, plusString, minusString, negativeString )
            } );
          }
          else {
            return nameString;
          }
        }
        else {
          return '';
        }
      } );
  }

  /**
   * Description of the axis of symmetry, optionally followed by its equation.
   */
  private static createAxisOfSymmetryDescriptionProperty(
    quadraticProperty: TReadOnlyProperty<Quadratic>,
    equationsVisibleProperty: TReadOnlyProperty<boolean> ): TReadOnlyProperty<string> {

    return new DerivedStringProperty( [
        quadraticProperty,
        equationsVisibleProperty,

        // Localized strings that are used in the derivation.
        GraphingQuadraticsStrings.axisOfSymmetryStringProperty,
        GraphingQuadraticsStrings.a11y.axisOfSymmetryEquationStringProperty,
        GraphingQuadraticsStrings.xStringProperty,
        GraphingQuadraticsStrings.a11y.equalsStringProperty
      ],
      ( quadratic, equationsVisible, axisOfSymmetryString, axisOfSymmetryEquationString, xString, equalsString ) => {
        const axisOfSymmetry = quadratic.axisOfSymmetry;
        if ( axisOfSymmetry === undefined ) {
          return '';
        }
        else {
          if ( equationsVisible ) {
            return StringUtils.fillIn( axisOfSymmetryEquationString, {
              equation: GQEquationDescriber.createAxisOfSymmetryDescription( axisOfSymmetry, xString, equalsString )
            } );
          }
          else {
            return axisOfSymmetryString;
          }
        }
      } );
  }

  /**
   * Description of the directrix, optionally followed by its equation.
   */
  private static createDirectrixDescriptionProperty(
    quadraticProperty: TReadOnlyProperty<Quadratic>,
    equationsVisibleProperty: TReadOnlyProperty<boolean> ): TReadOnlyProperty<string> {

    return new DerivedStringProperty( [
        quadraticProperty,
        equationsVisibleProperty,

        // Localized strings that are used in the derivation.
        GraphingQuadraticsStrings.directrixStringProperty,
        GraphingQuadraticsStrings.a11y.directrixEquationStringProperty,
        GraphingQuadraticsStrings.yStringProperty,
        GraphingQuadraticsStrings.a11y.equalsStringProperty
      ],
      ( quadratic, equationsVisible, directrixString, directrixEquationString, yString, equalsString ) => {
        const directrix = quadratic.directrix;
        if ( directrix === undefined ) {
          return '';
        }
        else {
          if ( equationsVisible ) {
            return StringUtils.fillIn( directrixEquationString, {
              equation: GQEquationDescriber.createDirectrixDescription( directrix, yString, equalsString )
            } );
          }
          else {
            return directrixString;
          }
        }
      } );
  }
}

graphingQuadratics.register( 'GQGraphAccessibleListNode', GQGraphAccessibleListNode );