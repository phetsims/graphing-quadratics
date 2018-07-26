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
  const Node = require( 'SCENERY/nodes/Node' );
  const GraphAndLinesNode = require( 'GRAPHING_QUADRATICS/common/view/GraphAndLinesNode' );

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

      // the graph and quadratics and lines and draggable point manipulator
      const graphAndLinesNode = new GraphAndLinesNode(
        model,
        layoutBounds,
        viewProperties,
        { hasVertexManipulator: options.hasVertexManipulator }
      );

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
      this.addChild( graphAndLinesNode );

      // layout - position of graphAndLinesNode is determined by model

      // position of control panels:
      const xMargin = 10;
      const yMargin = 20;
      const ySpacing = 15;

      // get the amount of canvas width that's available for the control panels
      const availableControlPanelWidth = layoutBounds.width - graphAndLinesNode.right - ( 2 * xMargin );

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
      controlsParent.centerX = graphAndLinesNode.right + xMargin + ( availableControlPanelWidth / 2 );
      controlsParent.top = yMargin;
    }
  }

  return graphingQuadratics.register( 'GQSceneNode', GQSceneNode );
} );
