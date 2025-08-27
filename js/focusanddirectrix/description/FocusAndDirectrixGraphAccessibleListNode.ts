// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import FocusAndDirectrixModel from '../model/FocusAndDirectrixModel.js';
import FocusAndDirectrixViewProperties from '../view/FocusAndDirectrixViewProperties.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import GQConstants from '../../common/GQConstants.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class FocusAndDirectrixGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: FocusAndDirectrixModel, viewProperties: FocusAndDirectrixViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Movable vertex', optionally followed by coordinates
    const movableVertexItem = GQGraphAccessibleListNode.createMovableVertexItem( model.quadraticProperty,
      viewProperties.coordinatesVisibleProperty, viewProperties.vertexVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Directrix', optionally followed by equation.
    const directrixItem = GQGraphAccessibleListNode.createDirectrixItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.directrixVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Movable point on parabola', optionally followed by coordinates
    const movablePointOnParabolaItem = {
      stringProperty: new DerivedStringProperty( [
          model.pointOnParabolaProperty,
          viewProperties.coordinatesVisibleProperty,
          GraphingQuadraticsStrings.a11y.movablePointOnParabolaStringProperty,
          GraphingQuadraticsStrings.a11y.movablePointOnParabolaAtCoordinatesStringProperty
        ],
        ( pointOnParabola, coordinatesVisible, movablePointOnParabola, movablePointOnParabolaAtCoordinatesString ) => {
          if ( coordinatesVisible ) {
            return StringUtils.fillIn( movablePointOnParabolaAtCoordinatesString, {
              x: toFixedNumber( pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS ),
              y: toFixedNumber( pointOnParabola.y, GQConstants.POINT_ON_PARABOLA_DECIMALS )
            } );
          }
          else {
            return movablePointOnParabola;
          }
        } ),
      visibleProperty: DerivedProperty.and( [ viewProperties.pointOnParabolaVisibleProperty, viewProperties.graphContentsVisibleProperty ] )
    };

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      movableVertexItem,
      directrixItem,
      movablePointOnParabolaItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixGraphAccessibleListNode', FocusAndDirectrixGraphAccessibleListNode );