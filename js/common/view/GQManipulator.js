// Copyright 2018-2020, University of Colorado Boulder

/**
 * An extension of Manipulator that adds a display of the manipulator's (x,y) coordinates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import CoordinatesNode from './CoordinatesNode.js';

// constants
const DEFAULT_LAYOUT_COORDINATES = ( coordinates, coordinatesNode, radius ) => {
  // centered above the manipulator
  coordinatesNode.centerX = 0;
  coordinatesNode.bottom = -( radius + 1 );
};

class GQManipulator extends Manipulator {

  /**
   * @param {Property.<Vector2|null>} coordinatesProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( coordinatesProperty, coordinatesVisibleProperty, options ) {

    options = merge( {

      // options passed to CoordinatesNode
      coordinatesBackgroundColor: 'black',
      coordinatesForegroundColor: 'white',
      coordinatesDecimals: 0,

      // {function( coordinates:Vector2, coordinatesNode:Node, radius:number )}
      // Positions the coordinates when coordinatesProperty changes
      layoutCoordinates: DEFAULT_LAYOUT_COORDINATES,

      // Manipulator constructor args
      radius: 10,
      color: 'black',

      // Manipulator options
      haloAlpha: 0.15,

      // phet-io
      tandem: Tandem.REQUIRED,
      inputEnabledPropertyPhetioInstrumented: true

    }, options );

    super( options.radius, options.color, options );

    // Determine the actual radius of the manipulator (sphere + optional halo) before adding coordinates.
    // This will be used to layout the coordinates relative to the sphere + halo.
    const actualRadius = this.width / 2;

    // add coordinates display
    const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
      backgroundColor: options.coordinatesBackgroundColor,
      foregroundColor: options.coordinatesForegroundColor,
      decimals: options.coordinatesDecimals,
      pickable: false,
      tandem: options.tandem.createTandem( 'coordinatesNode' ),
      phetioDocumentation: 'coordinates displayed on this manipulator'
    } );
    this.addChild( coordinatesNode );

    // update layout
    coordinatesProperty.link( coordinates => {
      options.layoutCoordinates( coordinates, coordinatesNode, actualRadius );
    } );

    // visibility
    coordinatesVisibleProperty.link( visible => {
      coordinatesNode.visible = visible;
      if ( visible ) {
        options.layoutCoordinates( coordinatesProperty.value, coordinatesNode, actualRadius );
      }
    } );
  }
}

graphingQuadratics.register( 'GQManipulator', GQManipulator );
export default GQManipulator;