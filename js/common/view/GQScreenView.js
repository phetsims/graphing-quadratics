// Copyright 2018, University of Colorado Boulder

/**
 * Base class for ScreenViews in this sim.
 * Responsible for creating Nodes that are common to all screens, and for common layout.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GraphContentsToggleButton = require( 'GRAPHING_LINES/common/view/GraphContentsToggleButton' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PointToolNode = require( 'GRAPHING_QUADRATICS/common/view/PointToolNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const X_SPACING = 15; // between graph and control panels

  class GQScreenView extends ScreenView {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Node} graphNode
     * @param {Node} equationAccordionBox
     * @param {Node} graphControlPanel
     * @param {Object} [options]
     */
    constructor( model, viewProperties, graphNode, equationAccordionBox, graphControlPanel, options ) {

      options = _.extend( {

        // ScreenView options
        layoutBounds: GQConstants.SCREEN_VIEW_LAYOUT_BOUNDS,

        // phet-io
        tandem: Tandem.required
      }, options );

      super( options );

      // Point tools moveToFront when dragged, so give them a common parent to preserve rendering order.
      const pointToolsParent = new Node();
      pointToolsParent.addChild( new PointToolNode(
        model.leftPointTool,
        model.modelViewTransform,
        model.graph,
        viewProperties.graphContentsVisibleProperty, {
          tandem: options.tandem.createTandem( 'leftPointToolNode' ),
          phetioDocumentation: 'the point tool that is initially on the left'
        } ) );
      pointToolsParent.addChild( new PointToolNode(
        model.rightPointTool,
        model.modelViewTransform,
        model.graph,
        viewProperties.graphContentsVisibleProperty, {
          tandem: options.tandem.createTandem( 'rightPointToolNode' ),
          phetioDocumentation: 'the point tool that is initially on the right'
        } ) );

      // Toggle button for showing/hiding contents of graph
      const graphContentsToggleButton = new GraphContentsToggleButton( viewProperties.graphContentsVisibleProperty, {
        scale: 0.75,
        left: model.modelViewTransform.modelToViewX( model.graph.xRange.max ) + 21,
        bottom: model.modelViewTransform.modelToViewY( model.graph.yRange.min ),
        tandem: options.tandem.createTandem( 'graphContentsToggleButton' ),
        phetioDocumentation: 'button that shows/hides the contents of the graph',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }
      } );

      // Set maxWidth for each control panel individually
      const controlPanelMaxWidth = this.layoutBounds.width - graphNode.width - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN ) - X_SPACING;
      assert && assert( controlPanelMaxWidth > 0, 'unexpected controlPanelMaxWidth: ' + controlPanelMaxWidth );
      equationAccordionBox.maxWidth = controlPanelMaxWidth;
      graphControlPanel.maxWidth = controlPanelMaxWidth;

      // Parent for all control panels, to simplify layout
      const controlsParent = new VBox( {

        // set maxHeight to guard against font size differences across supported browsers
        maxHeight: this.layoutBounds.height - ( 2 * GQConstants.SCREEN_VIEW_Y_MARGIN ),
        resize: false,
        align: 'center',
        spacing: 10,
        children: [
          equationAccordionBox,
          graphControlPanel
        ]
      } );

      // rendering order
      this.addChild( controlsParent );
      this.addChild( graphContentsToggleButton );
      this.addChild( graphNode );
      this.addChild( pointToolsParent );

      // Horizontally center controls in the space to the right of the graph.
      controlsParent.centerX = graphNode.right + X_SPACING + ( controlPanelMaxWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;

      // Reset All Button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput(); // interrupt all listeners for this screen
          model.reset();
          viewProperties.reset();
        },
        right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN,
        tandem: options.tandem.createTandem( 'resetAllButton' ),
        phetioDocumentation: 'button that resets the screen to its initial state',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }
      } );
      this.addChild( resetAllButton );
    }
  }

  return graphingQuadratics.register( 'GQScreenView', GQScreenView );
} );
