// Copyright 2014-2018, University of Colorado Boulder

/**
 * Base type for displaying the graph.
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
  const Property = require( 'AXON/Property' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );

  class GQGraphNode extends Node {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = _.extend( {
        specialLines: [], // {Nodes[]}
        decorations: [] // {Node[]}
      }, options );

      super( options );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve. dispose not needed.
      const interactiveQuadraticNode = new QuadraticNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties
      );

      // Parent for saved quadratics
      const savedQuadraticsLayer = new Node();

      // @private Parent for special lines, e.g. quadratic terms
      this.specialLinesLayer = new Node( { children: options.specialLines });

      // Parent for decorations, e.g. vertex, roots, manipulators
      this.decorationsLayer = new Node( { children: options.decorations } );

      // Clip content to the graph
      const clipArea = Shape.rectangle(
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() );

      // Everything that's on the graph, clipped to the graph
      const contentNode = new Node( {
        clipArea: clipArea,
        children: [ savedQuadraticsLayer, this.specialLinesLayer, interactiveQuadraticNode, this.decorationsLayer ]
      } );

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentNode );

      // When a quadratic is saved...  removeItemAddedListener not needed.
      model.savedQuadratics.addItemAddedListener( savedQuadratic => {

        // Node for the saved quadratic
        const savedQuadraticNode = new QuadraticNode( new Property( savedQuadratic ), model.graph, model.modelViewTransform, {
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
            model.savedQuadratics.removeItemRemovedListener( itemRemovedListener );
          }
        };
        model.savedQuadratics.addItemRemovedListener( itemRemovedListener ); // removeItemRemovedListener above
      } );

      // Show/hide the graph content. unlink not needed.
      viewProperties.graphContentsVisibleProperty.link( visible => { contentNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );