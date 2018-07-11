// Copyright 2018, University of Colorado Boulder

/**
 * Common view for a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );
  var GraphControls = require( 'GRAPHING_QUADRATICS/common/view/GraphControls' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntegerCoefficientsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegerCoefficientsInteractiveEquationNode' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {GQScene} model
   * @param {Bounds2} layoutBounds
   * @param {Node} equationNode
   * @constructor
   */
  function GQSceneNode( model, layoutBounds, equationNode, options ) {

    // @public
    this.scene = model;

    Node.call( this, options );

    // Graph Node - the cartesian coordinates graph
    var graphNode = new GraphNode( model.graph, model.modelViewTransform );

    // Equation Controls Panel
    var equationControls = new EquationControls(
      equationNode,
      new IntegerCoefficientsInteractiveEquationNode()
    );

    // Graph Controls Panel
    var graphControls = new GraphControls();

    // Parent for all controls, to simplify layout
    var controlsParent = new Node();
    controlsParent.addChild( equationControls );
    controlsParent.addChild( graphControls );

    // rendering order
    this.addChild( controlsParent );
    this.addChild( graphNode );

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
