// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base type for displaying a GQScene.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PointToolNode = require( 'GRAPHING_QUADRATICS/common/view/PointToolNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const X_SPACING = 15; // between graph and control panels

  class GQSceneNode extends Node {

    /**
     * @param {GQScene} scene
     * @param {Bounds2} layoutBounds
     * @param {GQViewProperties} viewProperties
     * @param {AccordionBox} accordionBox
     * @param {Panel} graphControls
     * @param {Object} [options]
     * @abstract
     */
    constructor( scene, layoutBounds, viewProperties, accordionBox, graphControls, options ) {

      options = _.extend( {
        pointToolsVisible: true
      }, options );

      super( options );

      // Point tools moveToFront when dragged, so give them a common parent to preserve rendering order.
      // dispose not needed.
      const pointToolsParent = new Node( {
        visible: options.pointToolsVisible
      } );
      scene.pointTools.forEach( pointTool => {
        pointToolsParent.addChild( new PointToolNode(
          pointTool,
          scene.modelViewTransform,
          scene.graph,
          viewProperties.curvesVisibleProperty
        ) );
      } );

      // The graph and everything on it -- position is determined by the model! dispose not needed.
      const graphNode = new GQGraphNode( scene, layoutBounds, viewProperties );

      const controlPanelMaxWidth = layoutBounds.width - graphNode.width - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN ) - X_SPACING;

      // Parent for all control panels, to simplify layout
      const controlsParent = new VBox( {
        maxWidth: controlPanelMaxWidth,
        resize: false,
        align: 'center',
        spacing: 10,
        children: [
          accordionBox,
          graphControls
        ]
      } );

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphNode );
      this.addChild( pointToolsParent );

      // Horizontally center controls in the space to the right of the graph.
      controlsParent.centerX = graphNode.right + X_SPACING + ( controlPanelMaxWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;

      // @public
      this.controlsParent = controlsParent;
      this.scene = scene;
    }
  }

  return graphingQuadratics.register( 'GQSceneNode', GQSceneNode );
} );
