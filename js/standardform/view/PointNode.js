// Copyright 2018, University of Colorado Boulder

/**
 * A non-interactive point on the graph, labeled with (x,y) coordinates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Tandem = require( 'TANDEM/Tandem' );

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

      options = _.extend( {

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
        tandem: Tandem.required,
        phetioReadOnly: true // see https://github.com/phetsims/graphing-quadratics/issues/80

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
        coordinatesNode.visible = visible;
        if ( visible ) {
          options.layoutCoordinates( coordinatesProperty.value, coordinatesNode, pointNode );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'PointNode', PointNode );
} );