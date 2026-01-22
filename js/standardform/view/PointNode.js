// Copyright 2018-2021, University of Colorado Boulder

/**
 * A non-interactive point on the graph, labeled with (x,y) coordinates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CoordinatesNode from '../../common/view/CoordinatesNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';

// constants
const DEFAULT_LAYOUT_COORDINATES = ( coordinates, coordinatesNode, pointNode ) => {
  // centered above the point
  coordinatesNode.centerX = pointNode.centerX;
  coordinatesNode.bottom = pointNode.top - 5;
};

class PointNode extends Node {

  /**
   * @param {Vector2Property} coordinatesProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( coordinatesProperty, coordinatesVisibleProperty, options ) {

    options = merge( {

      // radius of the point
      radius: 10,

      // options passed to CoordinatesNode
      coordinatesBackgroundColor: 'black',
      coordinatesForegroundColor: 'white',
      coordinatesDecimals: 0,

      // {function( coordinates:Vector2, coordinatesNode:Node, pointNode:Node )}
      // Positions the coordinates when coordinatesProperty changes
      layoutCoordinates: DEFAULT_LAYOUT_COORDINATES,

      // phet-io
      tandem: Tandem.REQUIRED

    }, options );

    // the point
    const pointNode = new Circle( options.radius, {
      fill: options.coordinatesBackgroundColor,
      x: 0,
      y: 0
    } );

    // the coordinates
    const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
      backgroundColor: options.coordinatesBackgroundColor,
      foregroundColor: options.coordinatesForegroundColor,
      decimals: options.coordinatesDecimals,
      visibleProperty: coordinatesVisibleProperty,
      tandem: options.tandem.createTandem( 'coordinatesNode' ),
      phetioDocumentation: 'coordinates displayed on this point'
    } );

    assert && assert( !options.children, 'PointNode sets children' );
    options.children = [ pointNode, coordinatesNode ];

    super( options );

    // update coordinates layout
    coordinatesProperty.link( coordinates => {
      options.layoutCoordinates( coordinates, coordinatesNode, pointNode );
    } );

    // visibility
    coordinatesVisibleProperty.link( visible => {
      if ( visible ) {
        options.layoutCoordinates( coordinatesProperty.value, coordinatesNode, pointNode );
      }
    } );
  }
}

graphingQuadratics.register( 'PointNode', PointNode );
export default PointNode;