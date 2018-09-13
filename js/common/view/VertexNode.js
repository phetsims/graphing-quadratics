// Copyright 2018, University of Colorado Boulder

/**
 * Displays the vertex as a non-interactive point with coordinates label.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  class VertexNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10
      }, options );

      const pointNode = new Circle( options.radius, {
        fill: GQColors.VERTEX,
        x: 0,
        y: 0
      } );

      const vertexProperty = new Property( quadraticProperty.value.vertex );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( vertexProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.VERTEX ).withAlpha( 0.75 ),
        decimals: 2
      } );

      assert && assert( !options.children, 'VertexNode sets children' );
      options.children = [ pointNode, coordinatesNode ];

      super( options );

      // y offset of coordinates from point
      const coordinatesYOffset = 2 * options.radius;

      // unlink not needed
      quadraticProperty.link( quadratic => {

        // point is visible only if the quadratic has a vertex
        this.visible = !!quadratic.vertex;

        vertexProperty.value = quadratic.vertex;

        // position coordinates based on which way the curve opens
        coordinatesNode.centerX = 0;
        if ( quadratic.a > 0 ) {
          coordinatesNode.top = coordinatesYOffset;
        }
        else {
          coordinatesNode.bottom = -coordinatesYOffset;
        }
      } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );
    }
  }

  return graphingQuadratics.register( 'VertexNode', VertexNode );
} );