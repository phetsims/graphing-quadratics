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
     * @param {GQScene} model
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, layoutBounds, viewProperties, options ) {

      options = _.extend( {
        hasVertexManipulator: false // only vertex scene has vertex manipulator
      }, options );

      super( options );

      // Location of the origin in view coordinate frame, for layout
      const origin = model.modelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve. dispose not needed.
      const quadraticNode = new QuadraticNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties
      );

      // Vertex manipulator. dispose not needed.
      let vertexManipulator;
      if ( options.hasVertexManipulator ) {
        vertexManipulator = new VertexManipulator(
          model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
          model.quadraticProperty,
          model.graph.xRange,
          model.graph.yRange,
          model.modelViewTransform
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
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() );

      // Everything that's on the graph, clipped to the graph
      const contentNode = new Node( { clipArea: clipArea } );
      contentNode.addChild( savedQuadraticsLayer );
      contentNode.addChild( quadraticNode );
      contentNode.addChild( noRealRootsNode );
      if ( options.hasVertexManipulator ) { contentNode.addChild( vertexManipulator ); }

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentNode );

      // When a quadratic is saved...  removeItemAddedListener not needed.
      model.savedQuadratics.addItemAddedListener( savedQuadratic => {

        // create Node for the new quadratic
        const path = quadraticNode.createPathWithColor( savedQuadratic, GQColors.SAVED_CURVE );
        savedQuadraticsLayer.addChild( path );

        // add listener for when the quadratic is eventually removed
        const itemRemovedListener = removedQuadratic => {
          if ( removedQuadratic === savedQuadratic ) {
            savedQuadraticsLayer.removeChild( path );
            model.savedQuadratics.removeItemRemovedListener( itemRemovedListener );
          }
        };
        model.savedQuadratics.addItemRemovedListener( itemRemovedListener ); // removeItemRemovedListener above
      } );

      // Show/hide the graph content. unlink not needed.
      viewProperties.linesVisibleProperty.link( linesVisible => { contentNode.visible = linesVisible; } );

      // If the quadratic has no roots, indicate so on the x axis. dispose not needed.
      Property.multilink( [ model.quadraticProperty, viewProperties.rootsVisibleProperty ],
        ( quadratic, rootsVisible ) => {
          noRealRootsNode.visible = ( quadratic.a !== 0 && !quadratic.hasRoots() && rootsVisible );
        } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );