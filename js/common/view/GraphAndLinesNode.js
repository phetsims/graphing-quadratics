// Copyright 2018, University of Colorado Boulder

/**
 * Common view for a scene. Base type for each of the two scenes on the standard form screen, as well as the single
 * scene in the vertex form screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class GraphAndLinesNode extends Node {

    /**
     * @param {GQScene} model
     * @param {Bounds2} layoutBounds
     * @param {LineFormsViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor(
      model,
      layoutBounds,
      viewProperties,
      options
    ) {

      options = _.extend( {
        hasVertexManipulator: false // only vertex scene has vertex manipulator
      }, options );

      super( options );

      // Graph Node - the cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Creating the view for the quadratics
      const quadraticNode = new QuadraticNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties
      );
      const clipArea = Shape.rectangle(
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() );

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

      // Create view for the saved quadratics
      const savedQuadraticsLayer = new Node();

      model.savedQuadratics.addItemAddedListener( addedQuadratic => {
        const newQuadraticNode = quadraticNode.createPathWithColor( addedQuadratic, 'blue' );
        savedQuadraticsLayer.addChild( newQuadraticNode );

        model.savedQuadratics.addItemRemovedListener( removedQuadratic => {
          if ( removedQuadratic === addedQuadratic ) {
            savedQuadraticsLayer.removeChild( newQuadraticNode );
          }
        } );
      } );

      // A layer to contain the quadratics and clip them to the graph area
      const quadraticsNode = new Node( { clipArea: clipArea } );

      quadraticsNode.addChild( savedQuadraticsLayer );
      quadraticsNode.addChild( quadraticNode );
      if ( options.hasVertexManipulator ) { quadraticsNode.addChild( vertexManipulator ); }

      // rendering order
      this.addChild( graphNode );
      this.addChild( quadraticsNode );
    }
  }

  return graphingQuadratics.register( 'GraphAndLinesNode', GraphAndLinesNode );
} );