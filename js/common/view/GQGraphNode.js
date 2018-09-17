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
  const InteractiveQuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/InteractiveQuadraticNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NoRealRootsNode = require( 'GRAPHING_QUADRATICS/common/view/NoRealRootsNode' );
  const Property = require( 'AXON/Property' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  class GQGraphNode extends Node {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      super( options );

      // Location of the origin in view coordinate frame, for layout
      const origin = model.modelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) );

      // Cartesian coordinates graph
      const graphNode = new GraphNode( model.graph, model.modelViewTransform );

      // Interactive quadratic curve. dispose not needed.
      const interactiveQuadraticNode = new InteractiveQuadraticNode(
        model.quadraticProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties
      );

      // 'no real roots' label
      const noRealRootsNode = new NoRealRootsNode( {
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
      contentNode.addChild( interactiveQuadraticNode );
      contentNode.addChild( noRealRootsNode );

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

      // If the quadratic has no roots, indicate so on the x axis. dispose not needed.
      Property.multilink( [ viewProperties.rootsVisibleProperty, model.quadraticProperty ],
        ( rootsVisible, quadratic ) => {
          noRealRootsNode.visible = !!( rootsVisible && quadratic.roots && quadratic.roots.length === 0 );
        } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );