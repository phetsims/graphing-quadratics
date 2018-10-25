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

        // {function( coordinates:Vector2, coordinatesNode:Node, radius:number )}
        // Positions the coordinates when coordinatesProperty changes, default is centered above the manipulator.
        layoutCoordinates: ( coordinates, coordinatesNode, radius ) => {
          coordinatesNode.centerX = 0;
          coordinatesNode.bottom = -( radius + 1 );
        },

        // Manipulator constructor args
        radius: 10,
        color: 'black',

        // Manipulator options
        haloAlpha: 0.15,
        tandem: Tandem.required,
        phetioReadOnly: true // see https://github.com/phetsims/graphing-quadratics/issues/80

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
      coordinatesVisibleProperty.linkAttribute( coordinatesNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'GQManipulator', GQManipulator );
} );
 