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

  // constants
  const Y_SPACING = 5;

  class VertexNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, modelViewTransform, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10
      }, options );

      const pointNode = new Circle( options.radius, {
        fill: GQColors.VERTEX,
        x: 0,
        y: 0
      } );

      const coordinatesProperty = new Property( quadraticProperty.value.vertex );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.VERTEX ).withAlpha( 0.75 ),
        decimals: 2
      } );

      assert && assert( !options.children, 'VertexNode sets children' );
      options.children = [ pointNode, coordinatesNode ];

      super( options );

      // unlink not needed
      quadraticProperty.link( quadratic => {

        coordinatesProperty.value = quadratic.vertex;

        // point is visible only if the quadratic has a vertex
        this.visible = !!quadratic.vertex;

        if ( this.visible ) {

          // move to the vertex location
          this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );

          // position coordinates on the outside of the curve
          coordinatesNode.centerX = pointNode.centerX;
          if ( quadratic.a > 0 ) {
            coordinatesNode.top = pointNode.bottom + Y_SPACING;
          }
          else {
            coordinatesNode.bottom = pointNode.top - Y_SPACING;
          }
        }
      } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );
    }
  }

  return graphingQuadratics.register( 'VertexNode', VertexNode );
} );