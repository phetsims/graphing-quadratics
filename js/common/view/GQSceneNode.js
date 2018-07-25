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
  const EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class GQSceneNode extends Node {

    /**
     * @param {GQScene} model
     * @param {Bounds2} layoutBounds
     * @param {Node} equationControlsTitleNode - a display of the general form of the equation
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {Panel} graphControls
     * @param {LineFormsViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor(
      model,
      layoutBounds,
      equationControlsTitleNode,
      interactiveEquationNode,
      graphControls,
      viewProperties,
      options
    ) {

      options = _.extend( {
        hasVertexManipulator: false // only vertex scene has vertex manipulator
      }, options );

      super( options );

      // @public
      this.scene = model;

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

      const equationControls = new EquationControls(
        equationControlsTitleNode,
        interactiveEquationNode,
        model.saveQuadratic.bind( model ),
        model.clearQuadratics.bind( model )
      );

      // Parent for all control panels, to simplify layout
      const controlsParent = new Node();
      controlsParent.addChild( equationControls );
      controlsParent.addChild( graphControls );

      // @public
      this.controlsParent = controlsParent;

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphNode );
      this.addChild( quadraticsNode );

      // layout - position of graphNode is determined by model

      // position of control panels:
      const xMargin = 10;
      const yMargin = 20;
      const ySpacing = 15;

      // get the amount of canvas width that's available for the control panels
      const availableControlPanelWidth = layoutBounds.width - graphNode.right - ( 2 * xMargin );

      // if either control panel is too wide, scale it
      if ( equationControls.width > availableControlPanelWidth ) {
        equationControls.scale = availableControlPanelWidth / equationControls.width;
      }
      if ( graphControls.width > availableControlPanelWidth ) {
        graphControls.scale = availableControlPanelWidth / graphControls.width;
      }

      // vertically stack controls, horizontally align centers
      equationControls.centerX = availableControlPanelWidth / 2;
      equationControls.y = 0;
      graphControls.centerX = equationControls.centerX;
      graphControls.top = equationControls.bottom + ySpacing;

      // center controls in the space to the right of the graph
      controlsParent.centerX = graphNode.right + xMargin + ( availableControlPanelWidth / 2 );
      controlsParent.top = yMargin;
    }
  }

  return graphingQuadratics.register( 'GQSceneNode', GQSceneNode );
} );
