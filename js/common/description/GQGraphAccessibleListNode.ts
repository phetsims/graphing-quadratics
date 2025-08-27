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
   * Description of a quadratic, optionally followed by the standard-form equation.
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
      } );
  }

  /**
   * Description of the axis of symmetry for a quadratic.
   */
  protected static createAxisOfSymmetryDescriptionProperty(
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
            assert && assert( quadratic.axisOfSymmetry !== undefined, 'expected axisOfSymmetry to be defined' );
            return StringUtils.fillIn( axisOfSymmetryEquationString, {
              equation: GQEquationDescriber.createAxisOfSymmetry( quadratic.axisOfSymmetry!, xString, equalsString )
            } );
          }
          else {
            return axisOfSymmetryString;
          }
        }
      } );
  }

}

graphingQuadratics.register( 'GQGraphAccessibleListNode', GQGraphAccessibleListNode );