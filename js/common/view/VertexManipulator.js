// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a quadratic by changing its vertex.
 * Displays the coordinates of the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  class VertexManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} coordinatesVisibleProperty
     */
    constructor( radius, quadraticProperty, xRange, yRange, modelViewTransform, coordinatesVisibleProperty ) {

      super( radius, GQColors.VERTEX, {
        haloAlpha: GQColors.VERTEX_MANIPULATOR_HALO_ALPHA
      } );

      // local Property whose value is the vertex of the current value of quadraticProperty
      const vertexProperty = new Property( quadraticProperty.value.vertex, {
        valueType: Vector2,
        reentrant: true
      } );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( vertexProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.VERTEX ).withAlpha( 0.75 ),
        decimals: 0,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesYOffset = 1.8 * radius;

      // unlink not needed
      const quadraticListener = quadratic => {

        // manipulator is visible only if the quadratic has a vertex
        this.visible = !!quadratic.vertex;

        if ( quadratic.vertex && !quadratic.vertex.equals( vertexProperty.value ) ) {
          vertexProperty.value = quadratic.vertex;
        }

        // position coordinates based on which way the curve opens
        coordinatesNode.centerX = 0;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.top = coordinatesYOffset;
        }
        else {
          coordinatesNode.bottom = -coordinatesYOffset;
        }
      };
      quadraticProperty.link( quadraticListener );

      // When the vertex changes, create new quadratic. 
      vertexProperty.link( vertex => {
        const quadratic = quadraticProperty.value;
        if ( vertex.x !== quadratic.vertex.x || vertex.y !== quadratic.vertex.y ) {
          quadraticProperty.value = Quadratic.createFromVertexForm( quadratic.a, vertex.x, vertex.y );
        }
      } );

      // move the manipulator
      vertexProperty.link( vertex => { this.translation = modelViewTransform.modelToViewPosition( vertex ); } );

      // unlink not needed
      coordinatesVisibleProperty.link( coordinatesVisible => { coordinatesNode.visible = coordinatesVisible; } );

      // @private
      this.addInputListener( new VertexDragHandler( vertexProperty, modelViewTransform,
        new Bounds2( xRange.min, yRange.min, xRange.max, yRange.max ) ) );
    }
  }

  graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

  class VertexDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {Property.<Vector2>} vertexProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Bounds2} bounds
     */
    constructor( vertexProperty, modelViewTransform, bounds ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewPosition( vertexProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          // transform the drag point from view to model coordinate frame
          const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
          let location = modelViewTransform.viewToModelPosition( parentPoint );

          // constrain to graph bounds
          location = bounds.closestPointTo( location );

          // snap to grid
          vertexProperty.value = new Vector2( Util.roundSymmetric( location.x ), Util.roundSymmetric( location.y ) );
        }
      } );
    }
  }

  graphingQuadratics.register( 'VertexManipulator.VertexDragHandler', VertexDragHandler );

  return VertexManipulator;
} );
