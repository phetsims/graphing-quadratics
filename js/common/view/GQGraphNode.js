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
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  // strings
  const noRealRootsString = require( 'string!GRAPHING_QUADRATICS/noRealRoots' );

  class GQGraphNode extends Node {

    /**
     * @param {GQScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, viewProperties, options ) {

      options = _.extend( {
        hasVertexManipulator: false // only vertex scene has vertex manipulator
      }, options );

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
      if ( options.hasVertexManipulator ) {
        vertexManipulator = new VertexManipulator(
          scene.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
          scene.quadraticProperty,
          scene.graph.xRange,
          scene.graph.yRange,
          scene.modelViewTransform
        );
      }

      // 'no real roots' label
      const noRealRootsLabel = new Text( noRealRootsString, {
        font: new PhetFont( { size: 18, weight: 'bold' } ),
        fill: 'white'
      } );
      const noRealRootsBackground = new Rectangle( noRealRootsLabel.bounds.dilatedXY( 5, 1 ), {
        fill: GQColors.ROOTS,
        opacity: 0.8,
        cornerRadius: 2,
        center: noRealRootsLabel.center
      } );
      const noRealRootsNode = new Node( {
        children: [ noRealRootsBackground, noRealRootsLabel ],
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
      if ( options.hasVertexManipulator ) { contentNode.addChild( vertexManipulator ); }

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
      viewProperties.curvesVisibleProperty.link( curvesVisible => { contentNode.visible = curvesVisible; } );

      // If the quadratic has no roots, indicate so on the x axis. dispose not needed.
      Property.multilink( [ scene.quadraticProperty, viewProperties.rootsVisibleProperty ],
        ( quadratic, rootsVisible ) => {
          noRealRootsNode.visible = ( quadratic.a !== 0 && !quadratic.hasRoots() && rootsVisible );
        } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );