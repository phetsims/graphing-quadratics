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
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
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
        hasVertexManipulator: false
      }, options );

      super( options );

      // Point tools moveToFront when dragged, so give them a common parent to preserve rendering order.
      const pointToolsParent = new Node();
      scene.pointTools.forEach( pointTool => {
        pointToolsParent.addChild( new PointToolNode(
          pointTool,
          scene.modelViewTransform,
          scene.graph,
          viewProperties.linesVisibleProperty,
          scene.lines
        ) );
      } );

      // The graph and everything on it -- position is determined by the model!
      const graphNode = new GQGraphNode( scene, layoutBounds, viewProperties, {
        hasVertexManipulator: options.hasVertexManipulator
      } );

      // Interactive equation and associated controls
      const equationAccordionBox = new EquationAccordionBox(
        interactiveEquationNode,
        scene.saveQuadratic.bind( scene ),
        scene.eraseQuadratics.bind( scene ),
        scene.savedQuadratics.lengthProperty, {
          titleNode: equationAccordionBoxTitleNode,
          expandedProperty: viewProperties.interactiveEquationVisibleProperty
        }
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
      } );

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphNode );
      this.addChild( pointToolsParent );

      // Constrain control panels to amount of horizontal space available.
      const availableControlPanelWidth = layoutBounds.width - graphNode.right - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN );
      controlsParent.maxWidth = 0.9 * availableControlPanelWidth;

      // Horizontally center controls in the space to the right of the graph.
      controlsParent.centerX = graphNode.right + GQConstants.SCREEN_VIEW_X_MARGIN + ( availableControlPanelWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;

      // @public
      this.controlsParent = controlsParent;
      this.scene = scene;
    }
  }

  return graphingQuadratics.register( 'GQSceneNode', GQSceneNode );
} );
