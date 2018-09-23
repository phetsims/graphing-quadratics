// Copyright 2018, University of Colorado Boulder

/**
 * Base type for ScreenViews in this sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GraphContentsToggleButton = require( 'GRAPHING_QUADRATICS/common/view/GraphContentsToggleButton' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PointToolNode = require( 'GRAPHING_QUADRATICS/common/view/PointToolNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const X_SPACING = 15; // between graph and control panels

  class GQScreenView extends ScreenView {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Node} graphNode
     * @param {Node} equationControls
     * @param {Node} graphControls
     * @param {Object} [options]
     */
    constructor( model, viewProperties, graphNode, equationControls, graphControls, options ) {

      options = _.extend( {
        layoutBounds: GQConstants.SCREEN_VIEW_LAYOUT_BOUNDS
      }, options );

      super( options );

      // Point tools moveToFront when dragged, so give them a common parent to preserve rendering order.
      // dispose not needed.
      const pointToolsParent = new Node();
      model.pointTools.forEach( pointTool => {
        pointToolsParent.addChild( new PointToolNode(
          pointTool,
          model.modelViewTransform,
          model.graph,
          viewProperties.graphContentsVisibleProperty
        ) );
      } );

      // Toggle button for showing/hiding contents of graph
      const eyeToggleButton = new GraphContentsToggleButton( viewProperties.graphContentsVisibleProperty, {
        scale: 0.75,
        left: model.modelViewTransform.modelToViewX( model.graph.xRange.max ) + 10,
        bottom: model.modelViewTransform.modelToViewY( model.graph.yRange.min )
      } );

      const controlPanelMaxWidth = this.layoutBounds.width - graphNode.width - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN ) - X_SPACING;

      // Parent for all control panels, to simplify layout
      const controlsParent = new VBox( {
        maxWidth: controlPanelMaxWidth,
        resize: false,
        align: 'center',
        spacing: 10,
        children: [
          equationControls,
          graphControls
        ]
      } );

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphNode );
      this.addChild( eyeToggleButton );
      this.addChild( pointToolsParent );

      // Horizontally center controls in the space to the right of the graph.
      controlsParent.centerX = graphNode.right + X_SPACING + ( controlPanelMaxWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;

      // Reset All Button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
          viewProperties.reset();
        },
        right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN
      } );
      this.addChild( resetAllButton );
    }
  }

  return graphingQuadratics.register( 'GQScreenView', GQScreenView );
} );
