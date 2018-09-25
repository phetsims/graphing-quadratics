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
     * @param {BooleanProperty} graphContentsVisibleProperty
     * @param {string} equationForm
     * @param {Object} [options]
     */
    constructor( model, graphContentsVisibleProperty, equationForm, options ) {

      options = _.extend( {
        specialLines: [], // {Nodes[]}
        decorations: [] // {Node[]},
      }, options );

      super( options );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve
      const interactiveQuadraticNode = new QuadraticNode(
        model.quadraticProperty, model.graph.xRange, model.graph.yRange, model.modelViewTransform, equationForm, {
          lineWidth: GQConstants.INTERACTIVE_CURVE_LINE_WIDTH
        } );

      // Parent for saved quadratics
      const savedQuadraticsLayer = new Node();

      // Parent for special lines, e.g. quadratic terms, axis of symmetry, directrix
      const specialLinesLayer = new Node( { children: options.specialLines } );

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
        children: [ savedQuadraticsLayer, specialLinesLayer, interactiveQuadraticNode ]
      } );

      // Everything that's on the graph
      const contentParent = new Node( {
        children: [ allLinesParent, decorationsLayer ]
      } );

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentParent );

      // When a quadratic is saved...
      model.savedQuadratics.addItemAddedListener( savedQuadratic => {

        // Node for the saved quadratic
        const savedQuadraticNode = new QuadraticNode(
          new Property( savedQuadratic ), model.graph.xRange, model.graph.yRange, model.modelViewTransform, equationForm, {
            lineWidth: GQConstants.SAVED_CURVE_LINE_WIDTH
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

      // Show/hide the graph content
      graphContentsVisibleProperty.link( visible => { contentParent.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );