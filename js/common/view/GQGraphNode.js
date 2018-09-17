// Copyright 2014-2018, University of Colorado Boulder

/**
 * Displays the graph and everything that appears on it (aka, it's content).
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const InteractiveQuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/InteractiveQuadraticNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NoRealRootsNode = require( 'GRAPHING_QUADRATICS/common/view/NoRealRootsNode' );
  const PointOnQuadraticManipulator = require( 'GRAPHING_QUADRATICS/common/view/PointOnQuadraticManipulator' );
  const Property = require( 'AXON/Property' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class GQGraphNode extends Node {

    /**
     * @param {GQScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, viewProperties, options ) {

      super( options );

      // Location of the origin in view coordinate frame, for layout
      const origin = scene.modelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( scene.graph, scene.modelViewTransform );

      // Interactive quadratic curve. dispose not needed.
      const interactiveQuadraticNode = new InteractiveQuadraticNode(
        scene.quadraticProperty,
        scene.graph,
        scene.modelViewTransform,
        viewProperties
      );

      // Vertex manipulator. dispose not needed.
      let vertexManipulator;
      if ( scene.hRange && scene.kRange ) {
        vertexManipulator = new VertexManipulator(
          scene.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
          scene.quadraticProperty,
          scene.hRange,
          scene.kRange,
          scene.modelViewTransform,
          viewProperties.coordinatesVisibleProperty
        );
      }

      // Point on Quadratic manipulator, dispose not needed.
      const pointOnQuadraticManipulator = new PointOnQuadraticManipulator(
        scene.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        scene.quadraticProperty,
        scene.graph.xRange,
        scene.graph.yRange,
        scene.modelViewTransform,
        viewProperties.coordinatesVisibleProperty
      );

      // 'no real roots' label
      const noRealRootsNode = new NoRealRootsNode( {
        center: origin
      } );

      // Parent for saved quadratics
      const savedQuadraticsLayer = new Node();

      // Clip content to the graph
      const clipArea = Shape.rectangle(
        scene.graph.xRange.min,
        scene.graph.yRange.min,
        scene.graph.xRange.getLength(),
        scene.graph.yRange.getLength()
      ).transformed( scene.modelViewTransform.getMatrix() );

      // Everything that's on the graph, clipped to the graph
      const contentNode = new Node( { clipArea: clipArea } );
      contentNode.addChild( savedQuadraticsLayer );
      contentNode.addChild( interactiveQuadraticNode );
      contentNode.addChild( noRealRootsNode );
      vertexManipulator && contentNode.addChild( vertexManipulator );
      contentNode.addChild( pointOnQuadraticManipulator );

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentNode );

      // When a quadratic is saved...  removeItemAddedListener not needed.
      scene.savedQuadratics.addItemAddedListener( savedQuadratic => {

        // Node for the saved quadratic
        const savedQuadraticNode = new QuadraticNode( new Property( savedQuadratic ), scene.graph, scene.modelViewTransform, {
          pathOptions: {
            stroke: GQColors.SAVED_CURVE,
            lineWidth: GQConstants.SAVED_CURVE_LINE_WIDTH
          }
        } );
        savedQuadraticsLayer.addChild( savedQuadraticNode );

        // add listener for when the saved quadratic is eventually removed
        const itemRemovedListener = removedQuadratic => {
          if ( removedQuadratic === savedQuadratic ) {
            savedQuadraticsLayer.removeChild( savedQuadraticNode );
            scene.savedQuadratics.removeItemRemovedListener( itemRemovedListener );
          }
        };
        scene.savedQuadratics.addItemRemovedListener( itemRemovedListener ); // removeItemRemovedListener above
      } );

      // Show/hide the graph content. unlink not needed.
      viewProperties.curvesVisibleProperty.link( visible => { contentNode.visible = visible; } );

      // Show/hide the point manipulator
      viewProperties.pointOnQuadraticVisibleProperty.link( visible => { pointOnQuadraticManipulator.visible = visible; } );

      // If the quadratic has no roots, indicate so on the x axis. dispose not needed.
      Property.multilink( [ viewProperties.rootsVisibleProperty, scene.quadraticProperty ],
        ( rootsVisible, quadratic ) => {
          noRealRootsNode.visible = !!( rootsVisible && quadratic.roots && quadratic.roots.length === 0 );
        } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );