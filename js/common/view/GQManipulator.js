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
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Tandem = require( 'TANDEM/Tandem' );

  class GQManipulator extends Manipulator {

    /**
     * @param {Property.<Vector2|null>} coordinatesProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( coordinatesProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // options passed to CoordinatesNode
        coordinatesBackgroundColor: 'black',
        coordinatesForegroundColor: 'white',
        coordinatesDecimals: 0,

        //TODO provide default that puts coordinates above manipulator
        // {function( coordinates:Vector2, coordinatesNode:Node )}
        // positions the coordinates when coordinatesProperty changes
        layoutCoordinates: ( coordinates, coordinatesNode ) => {},

        // Manipulator constructor args
        radius: 10,
        color: 'black',

        // Manipulator options
        haloAlpha: 0.15,
        tandem: Tandem.required

      }, options );

      super( options.radius, options.color, options );

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
      coordinatesProperty.link( coordinates => { options.layoutCoordinates( coordinates, coordinatesNode ); } );

      // visibility
      coordinatesVisibleProperty.linkAttribute( coordinatesNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'GQManipulator', GQManipulator );
} );
 