// Copyright 2018, University of Colorado Boulder

/**
 * An extension of Manipulator that adds a display of the manipulator's (x,y) coordinates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );

  class GQManipulator extends Manipulator {

    /**
     * @param {number} radius radius of the sphere
     * @param {Color|String} color base color used to shade the sphere
     * @param {Object} [options]
     * @param {Property.<Vector2|null>} coordinatesProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param options
     */
    constructor( radius, color, coordinatesProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // options passed to CoordinatesNode
        coordinatesBackgroundColor: 'black',
        coordinatesForegroundColor: 'white',
        coordinatesDecimals: 0,

        // {function( coordinates:Vector2, coordinatesNode:Node )}
        // positions the coordinates when coordinatesProperty changes
        layoutCoordinates: ( coordinates, coordinatesNode ) => {},

        // Manipulator options
        haloAlpha: 0.15

      }, options );

      super( radius, color, options );

      // add coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        backgroundColor: options.coordinatesBackgroundColor,
        foregroundColor: options.coordinatesForegroundColor,
        decimals: options.coordinatesDecimals,
        pickable: false,
        maxWidth: GQConstants.COORDINATES_MAX_WIDTH
      } );
      this.addChild( coordinatesNode );

      // update layout
      coordinatesProperty.link( coordinates => { options.layoutCoordinates( coordinates, coordinatesNode ); } );

      // visibility
      coordinatesVisibleProperty.linkAttribute( coordinatesNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'GQManipulator', GQManipulator );
} );
 