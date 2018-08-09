// Copyright 2014-2018, University of Colorado Boulder

/**
 * Displays the graph and everything that appears on it (aka, it's content).
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

      // 'no real roots' label
      const noRealRootsLabel = new Text( noRealRootsString, {
        font: new PhetFont( { size: 18, weight: 'bold' } ),
        fill: 'white'
      } );
      const noRealRootsBackground = new Rectangle( noRealRootsLabel.bounds.dilatedXY( 5, 2 ), {
        fill: GQColors.ROOTS,
        opacity: 0.75,
        cornerRadius: 2,
        center: noRealRootsLabel.center
      } );
      const noRealRootsNode = new Node( {
        children: [ noRealRootsBackground, noRealRootsLabel ],
        center: origin
      } );

      // Parent for saved curves
      const savedCurvesLayer = new Node();

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
      contentNode.addChild( noRealRootsNode );
      if ( options.hasVertexManipulator ) { contentNode.addChild( vertexManipulator ); }

      // rendering order
      this.addChild( graphNode );
      this.addChild( contentNode );

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

      // Show/hide the graph content
      viewProperties.hideCurvesProperty.link( hideCurves => {contentNode.visible = !hideCurves; } );

      // If the quadratic has no roots, indicate so on the x axis
      Property.multilink( [ model.quadraticProperty, viewProperties.rootsVisibleProperty ],
        ( quadratic, rootsVisible ) => {
          noRealRootsNode.visible = ( !quadratic.hasRoots() && rootsVisible );
        } );
    }
  }

  return graphingQuadratics.register( 'GQGraphNode', GQGraphNode );
} );