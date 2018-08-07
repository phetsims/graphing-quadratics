// Copyright 2014-2018, University of Colorado Boulder

//TODO consider a better name for this class
/**
 * Common view for a scene. Base type for each of the two scenes on the standard form screen, as well as the single
 * scene in the vertex form screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class GraphAndLinesNode extends Node {

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

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve
      const quadraticNode = new QuadraticNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties
      );

      // Vertex manipulator
      let vertexManipulator;
      if ( options.hasVertexManipulator ) {
        vertexManipulator = new VertexManipulator(
          GQConstants.MANIPULATOR_RADIUS,
          model.quadraticProperty,
          model.graph.xRange,
          model.graph.yRange,
          model.modelViewTransform
        );
      }

      // Parent for saved curves
      const savedCurvesLayer = new Node();

      // When a quadratic is saved...
      model.savedQuadratics.addItemAddedListener( savedQuadratic => {

        // create Node for the new quadratic
        const newQuadraticNode = quadraticNode.createPathWithColor( savedQuadratic, GQColors.SAVED_CURVE );
        savedCurvesLayer.addChild( newQuadraticNode );

        //TODO memory leak?
        // add listener for when the quadratic is eventually removed
        model.savedQuadratics.addItemRemovedListener( removedQuadratic => {
          if ( removedQuadratic === savedQuadratic ) {
            savedCurvesLayer.removeChild( newQuadraticNode );
          }
        } );
      } );

      // Clip content to the graph
      const clipArea = Shape.rectangle(
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() );

      // Everything that's on the graph, clipped to the graph
      const contentNode = new Node( { clipArea: clipArea } );
      contentNode.addChild( savedCurvesLayer );
      contentNode.addChild( quadraticNode );
      if ( options.hasVertexManipulator ) { contentNode.addChild( vertexManipulator ); }

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentNode );

      // Show/hide the graph content
      viewProperties.hideCurvesProperty.link( hideCurves => {contentNode.visible = !hideCurves; } );
    }
  }

  return graphingQuadratics.register( 'GraphAndLinesNode', GraphAndLinesNode );
} );