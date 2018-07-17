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
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  var Shape = require( 'KITE/Shape' );
  var EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );

  /**
   * @param {GQScene} model
   * @param {Bounds2} layoutBounds
   * @param {Node} equationControlsTitleNode - a display of the general form of the equation
   * @param {Node} interactiveEquationNode - interactive equation
   * @param {Panel} graphControls
   * @param {LineFormsViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function GQSceneNode( model, layoutBounds, equationControlsTitleNode, interactiveEquationNode, graphControls, viewProperties, options ) {

    // @public
    this.scene = model;

    Node.call( this, options );

    // Graph Node - the cartesian coordinates graph
    var graphNode = new GraphNode( model.graph, model.modelViewTransform );

    // Creating the view for the quadratics
    var quadraticNode = new QuadraticNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties
    );
    var clipArea = Shape.rectangle(
      model.graph.xRange.min,
      model.graph.yRange.min,
      model.graph.xRange.getLength(),
      model.graph.yRange.getLength()
    ).transformed( model.modelViewTransform.getMatrix() );

    // Create view for the saved quadratics
    var savedQuadraticsLayer = new Node();

    // A layer to contain the quadratics and clip them to the graph area
    var quadraticsNode = new Node( {
      children: [ savedQuadraticsLayer, quadraticNode ],
      clipArea: clipArea
    } );

    var equationControls = new EquationControls(
      equationControlsTitleNode,
      interactiveEquationNode,
      function() {
        savedQuadraticsLayer.removeAllChildren();
        savedQuadraticsLayer.addChild( quadraticfonNode.withColor() );
        },
      function() { savedQuadraticsLayer.removeAllChildren(); }
    );

    // Parent for all control panels, to simplify layout
    var controlsParent = new Node();
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
    var xMargin = 10;
    var yMargin = 20;
    var ySpacing = 15;

    // get the amount of canvas width that's available for the control panels
    var availableControlPanelWidth = layoutBounds.width - graphNode.right - ( 2 * xMargin );

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

  graphingQuadratics.register( 'GQSceneNode', GQSceneNode );

  return inherit( Node, GQSceneNode );
} );
