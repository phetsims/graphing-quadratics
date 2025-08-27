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
}

graphingQuadratics.register( 'GQGraphAccessibleListNode', GQGraphAccessibleListNode );