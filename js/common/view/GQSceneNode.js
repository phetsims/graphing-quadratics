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
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Shape = require( 'KITE/Shape' );

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

    // Create view for the saved quadratics
    const savedQuadraticsLayer = new Node();

    model.savedQuadratics.addItemAddedListener( function( addedQuadratic ) {
      const newQuadraticNode = quadraticNode.createPathWithColor( addedQuadratic, 'blue' );
      savedQuadraticsLayer.addChild( newQuadraticNode );

      model.savedQuadratics.addItemRemovedListener( ( function( removedQuadratic ) {
        if ( removedQuadratic === addedQuadratic ){
          savedQuadraticsLayer.removeChild( newQuadraticNode );
        }
      } ) );
    } );

    // A layer to contain the quadratics and clip them to the graph area
    const quadraticsNode = new Node( {
      children: [ savedQuadraticsLayer, quadraticNode ],
      clipArea: clipArea
    } );

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

  graphingQuadratics.register( 'GQSceneNode', GQSceneNode );

  return inherit( Node, GQSceneNode );
} );
