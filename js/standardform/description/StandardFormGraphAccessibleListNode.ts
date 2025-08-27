// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../common/description/GQGraphAccessibleListNode.js';
import StandardFormModel from '../model/StandardFormModel.js';
import StandardFormViewProperties from '../view/StandardFormViewProperties.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import GQConstants from '../../common/GQConstants.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';

export default class StandardFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Vertex', optionally followed by coordinates
    assert && assert( viewProperties.coordinatesVisibleProperty, 'expected coordinatesVisibleProperty to be defined' );
    assert && assert( viewProperties.vertexVisibleProperty, 'expected vertexVisibleProperty to be defined' );
    const vertexItem = {
      stringProperty: new DerivedStringProperty( [
          model.quadraticProperty,
          viewProperties.coordinatesVisibleProperty!,
          GraphingQuadraticsStrings.vertexStringProperty,
          GraphingQuadraticsStrings.a11y.vertexAtCoordinatesStringProperty
        ],
        ( quadratic, coordinatesVisible, vertexString, vertexAtCoordinatesString ) => {
          const vertex = quadratic.vertex;
          if ( vertex === undefined ) {
            return '';
          }
          else {
            if ( coordinatesVisible ) {
              return StringUtils.fillIn( vertexAtCoordinatesString, {
                x: toFixedNumber( vertex.x, GQConstants.VERTEX_DECIMALS ),
                y: toFixedNumber( vertex.y, GQConstants.VERTEX_DECIMALS )
              } );
            }
            else {
              return vertexString;
            }
          }
        } ),

      // Note that the vertex will be undefined when a = 0.
      visibleProperty: new DerivedProperty(
        [ model.quadraticProperty, viewProperties.vertexVisibleProperty!, viewProperties.graphContentsVisibleProperty ],
        ( quadratic, vertexVisible, graphContentsVisible ) => ( quadratic.vertex !== undefined ) && vertexVisible && graphContentsVisible )
    };

    // 'Axis of Symmetry', optionally followed by equation.
    // Note that the axis of symmetry will be undefined when a = 0.
    assert && assert( viewProperties.axisOfSymmetryVisibleProperty, 'expected axisOfSymmetryVisibleProperty to be defined' );
    const axisOfSymmetryItem = GQGraphAccessibleListNode.createAxisOfSymmetryItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.axisOfSymmetryVisibleProperty!, viewProperties.graphContentsVisibleProperty );

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      vertexItem,
      axisOfSymmetryItem
      //TODO https://github.com/phetsims/graphing-quadratics/issues/214 rootsItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'StandardFormGraphAccessibleListNode', StandardFormGraphAccessibleListNode );