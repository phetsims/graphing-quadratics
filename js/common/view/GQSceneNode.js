// Copyright 2014-2018, University of Colorado Boulder

/**
 * Displays a GQScene.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GraphAndLinesNode = require( 'GRAPHING_QUADRATICS/common/view/GraphAndLinesNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PointToolNode = require( 'GRAPHING_QUADRATICS/common/view/PointToolNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class GQSceneNode extends Node {

    /**
     * @param {GQScene} scene
     * @param {Bounds2} layoutBounds
     * @param {Node} equationAccordionBoxTitleNode - a display of the general form of the equation
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {Panel} graphControls
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, layoutBounds, equationAccordionBoxTitleNode, interactiveEquationNode,
                 graphControls, viewProperties, options ) {

      options = _.extend( {
        hasVertexManipulator: false // only vertex scene has vertex manipulator
      }, options );

      super( options );

      //TODO generalize to N point tools
      // Point tools
      const pointTool1 = new PointToolNode(
        scene.pointTool1,
        scene.modelViewTransform,
        scene.graph,
        viewProperties.linesVisibleProperty,
        scene.lines
      );
      const pointTool2 = new PointToolNode(
        scene.pointTool2,
        scene.modelViewTransform,
        scene.graph,
        viewProperties.linesVisibleProperty,
        scene.lines
      );

      // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order.
      const pointToolParent = new Node();
      pointToolParent.addChild( pointTool1 );
      pointToolParent.addChild( pointTool2 );

      // The graph and everything on it -- position is determined by the model!
      const graphAndLinesNode = new GraphAndLinesNode( scene, layoutBounds, viewProperties, {
        hasVertexManipulator: options.hasVertexManipulator
      } );

      // Interactive equation and associated controls
      const equationAccordionBox = new EquationAccordionBox(
        equationAccordionBoxTitleNode,
        interactiveEquationNode,
        scene.saveQuadratic.bind( scene ),
        scene.clearQuadratics.bind( scene ),
        scene.savedQuadratics.lengthProperty,
        viewProperties.interactiveEquationVisibleProperty
      );

      // Parent for all control panels, to simplify layout
      const controlsParent = new VBox( {
        resize: false,
        align: 'center',
        spacing: 15,
        children: [
          equationAccordionBox,
          graphControls
        ]
      });

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphAndLinesNode );
      this.addChild( pointToolParent );

      // Constrain control panels to amount of horizontal space available.
      const availableControlPanelWidth = layoutBounds.width - graphAndLinesNode.right - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN );
      controlsParent.maxWidth = 0.9 * availableControlPanelWidth;

      // Horizontally center controls in the space to the right of the graph.
      controlsParent.centerX = graphAndLinesNode.right + GQConstants.SCREEN_VIEW_X_MARGIN + ( availableControlPanelWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;

      // @public
      this.controlsParent = controlsParent;
      this.scene = scene;
    }
  }

  return graphingQuadratics.register( 'GQSceneNode', GQSceneNode );
} );
