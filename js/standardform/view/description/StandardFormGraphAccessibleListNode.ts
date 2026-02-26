// Copyright 2025, University of Colorado Boulder

/**
 * StandardFormGraphAccessibleListNode is the dynamic description (in bullet list format) of what is shown on
 * the graph in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import graphingQuadratics from '../../../graphingQuadratics.js';
import GQGraphAccessibleListNode from '../../../common/view/description/GQGraphAccessibleListNode.js';
import StandardFormModel from '../../model/StandardFormModel.js';
import StandardFormViewProperties from '../StandardFormViewProperties.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import GraphingQuadraticsStrings from '../../../GraphingQuadraticsStrings.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import GQConstants from '../../../common/GQConstants.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';

export default class StandardFormGraphAccessibleListNode extends GQGraphAccessibleListNode {

  public constructor( model: StandardFormModel, viewProperties: StandardFormViewProperties ) {

    // 'Primary Parabola', optionally followed by standard form equation
    const primaryParabolaItem = GQGraphAccessibleListNode.createPrimaryQuadraticItem( model.quadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Saved Parabola', optionally followed by standard form equation
    const savedParabolaItem = GQGraphAccessibleListNode.createSavedQuadraticItem( model.savedQuadraticProperty,
      viewProperties.equationForm, viewProperties.equationsVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'Vertex', optionally followed by coordinates
    const vertexItem = {
      stringProperty: new DerivedStringProperty( [
          model.quadraticProperty,
          viewProperties.coordinatesVisibleProperty,
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
        [ model.quadraticProperty, viewProperties.vertexVisibleProperty, viewProperties.graphContentsVisibleProperty ],
        ( quadratic, vertexVisible, graphContentsVisible ) => ( quadratic.vertex !== undefined ) && vertexVisible && graphContentsVisible )
    };

    // 'Axis of Symmetry', optionally followed by equation.
    // Note that the axis of symmetry will be undefined when a = 0.
    const axisOfSymmetryItem = GQGraphAccessibleListNode.createAxisOfSymmetryItem( model.quadraticProperty,
      viewProperties.equationsVisibleProperty, viewProperties.axisOfSymmetryVisibleProperty, viewProperties.graphContentsVisibleProperty );

    // 'No real roots', or 'Roots' optionally followed by coordinates.
    const rootsItem = {
      stringProperty: new DerivedStringProperty( [
          model.quadraticProperty,
          viewProperties.coordinatesVisibleProperty,
          GraphingQuadraticsStrings.noRealRootsStringProperty,
          GraphingQuadraticsStrings.rootsStringProperty,
          GraphingQuadraticsStrings.a11y.rootsAtCoordinates1StringProperty,
          GraphingQuadraticsStrings.a11y.rootsAtCoordinates2StringProperty
        ],
        ( quadratic, coordinatesVisible, noRealRootsString, rootsString, rootsAtCoordinates1String, rootsAtCoordinates2String ) => {
          const roots = quadratic.roots;
          if ( roots === null ) {
            return ''; // All points are roots (y = 0), and the visual UI does not show roots.
          }
          else {
            affirm( roots.length <= 2 );
            if ( roots.length === 0 ) {
              return noRealRootsString;
            }
            else if ( !coordinatesVisible ) {
              return rootsString;
            }
            else if ( roots.length === 1 ) {
              const root = roots[ 0 ];
              return StringUtils.fillIn( rootsAtCoordinates1String, {
                x: toFixedNumber( root.x, GQConstants.ROOTS_DECIMALS ),
                y: toFixedNumber( root.y, GQConstants.ROOTS_DECIMALS )
              } );
            }
            else {
              // roots.length === 2
              const root1 = roots[ 0 ];
              const root2 = roots[ 1 ];
              return StringUtils.fillIn( rootsAtCoordinates2String, {
                x1: toFixedNumber( root1.x, GQConstants.ROOTS_DECIMALS ),
                y1: toFixedNumber( root1.y, GQConstants.ROOTS_DECIMALS ),
                x2: toFixedNumber( root2.x, GQConstants.ROOTS_DECIMALS ),
                y2: toFixedNumber( root2.y, GQConstants.ROOTS_DECIMALS )
              } );
            }
          }
        } ),

      // Note that roots === null means that all points are roots (y = 0), and nothing is shown in the visual UI.
      visibleProperty: new DerivedProperty(
        [ model.quadraticProperty, viewProperties.rootsVisibleProperty, viewProperties.graphContentsVisibleProperty ],
        ( quadratic, rootsVisible, graphContentsVisible ) => ( quadratic !== null ) && rootsVisible && graphContentsVisible )
    };

    const listItems: AccessibleListItem[] = [
      primaryParabolaItem,
      savedParabolaItem,
      vertexItem,
      axisOfSymmetryItem,
      rootsItem
    ];

    super( listItems, viewProperties.graphContentsVisibleProperty );
  }
}

graphingQuadratics.register( 'StandardFormGraphAccessibleListNode', StandardFormGraphAccessibleListNode );