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
        preventVertexAndEquationOverlap: true, // prevent a parabola's vertex and equation from overlapping
        otherLines: [], // {Nodes[]}, other lines to be displayed (term, directrix,...) rendered in the order provided
        decorations: [] // {Node[]}, decorations (point, manipulators,...) rendered in the order provided
      }, options );

      super( options );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve
      const interactiveQuadraticNode = new QuadraticNode(
        model.quadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.equationForm,
        viewProperties.equationsVisibleProperty, {
          lineWidth: GQConstants.INTERACTIVE_LINE_WIDTH,
          preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap
        } );

      // {QuadraticNode|null} the saved line
      let savedLineNode = null;

      // Parent for other lines, e.g. quadratic terms, directrix, axis of symmetry
      const otherLinesLayer = new Node( { children: options.otherLines } );

      // Parent for decorations, e.g. vertex, roots, manipulators
      const decorationsLayer = new Node( { children: options.decorations } );

      // All lines, clipped to the graph
      const allLinesParent = new Node( {
        clipArea: Shape.rectangle(
          model.graph.xRange.min,
          model.graph.yRange.min,
          model.graph.xRange.getLength(),
          model.graph.yRange.getLength()
        ).transformed( model.modelViewTransform.getMatrix() ),
        children: [ otherLinesLayer, interactiveQuadraticNode ]
      } );

      // Everything that's on the graph
      const contentParent = new Node( {
        children: [ allLinesParent, decorationsLayer ]
      } );

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentParent );

      // When a quadratic is saved...
      model.savedQuadraticProperty.link( savedQuadratic => {

        // remove any previous saved line
        savedLineNode && allLinesParent.removeChild( savedLineNode );
        savedLineNode = null;

        if ( savedQuadratic ) {
          savedLineNode = new QuadraticNode(
            new Property( savedQuadratic ),
            model.graph.xRange,
            model.graph.yRange,
            model.modelViewTransform,
            viewProperties.equationForm,
            viewProperties.equationsVisibleProperty, {
              lineWidth: GQConstants.SAVED_LINE_WIDTH,
              preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap
            } );

          // Add it in the foreground, so the user can see it.
          // See https://github.com/phetsims/graphing-quadratics/issues/36
          allLinesParent.addChild( savedLineNode );
        }
      } );

      // When quadraticProperty changes, move saved line to background.
      // See https://github.com/phetsims/graphing-quadratics/issues/36
      model.quadraticProperty.link( quadratic => {
        savedLineNode && savedLineNode.moveToBack();
      } );

      // Show/hide the graph contents
      viewProperties.graphContentsVisibleProperty.link( visible => {
        contentParent.visible = visible;
        !visible && decorationsLayer.interruptSubtreeInput(); // cancel interaction with graph contents
      } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );