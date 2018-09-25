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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const Y_SPACING = 5;

  class VertexNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform,
                 vertexVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10
      }, options );

      const pointNode = new Circle( options.radius, {
        fill: GQColors.VERTEX,
        x: 0,
        y: 0
      } );

      const coordinatesProperty = new Property( null, {
        isValidValue: value => { return value instanceof Vector2 || value === null; }
      } );

      // displays the vertex coordinates
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.VERTEX ).withAlpha( 0.75 ),
        decimals: GQConstants.POINT_DECIMALS
      } );

      assert && assert( !options.children, 'VertexNode sets children' );
      options.children = [ pointNode, coordinatesNode ];

      super( options );

      quadraticProperty.link( quadratic => {

        if ( quadratic.vertex ) {

          // update coordinates
          coordinatesProperty.value = quadratic.vertex;

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

      Property.multilink( [ vertexVisibleProperty, quadraticProperty ],
        ( vertexVisible, quadratic ) => {
          this.visible = !!( vertexVisible &&
                             quadratic.vertex !== undefined &&
                             graph.contains( quadratic.vertex ) );
        } );

      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'VertexNode', VertexNode );
} );