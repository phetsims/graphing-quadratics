// Copyright 2018, University of Colorado Boulder

/**
 * Displays the directrix for a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BackgroundNode = require( 'GRAPHING_QUADRATICS/common/view/BackgroundNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RichText = require( 'SCENERY/nodes/RichText' );

  class DirectrixNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     */
    constructor( quadraticProperty, graph, modelViewTransform, directrixVisibleProperty, equationsVisibleProperty ) {

      super();

      // horizontal line
      const lineNode = new Line( 0, 0, 0, 1, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
        lineDash: GQConstants.DIRECTRIX_LINE_DASH
      } );
      this.addChild( lineNode );

      // text of the equation
      const equationText = new RichText( '', {
        font: GQConstants.GRAPHED_EQUATION_FONT,
        fill: GQColors.DIRECTRIX
      } );

      // equation text on a translucent background
      const equationNode = new BackgroundNode( equationText, {
        maxWidth: 100 // determined empirically
      } );
      this.addChild( equationNode );

      // endpoints of the line in model coordinates
      const minX = modelViewTransform.modelToViewX( graph.xRange.min );
      const maxX = modelViewTransform.modelToViewX( graph.xRange.max );

      // update when the interactive quadratic changes
      quadraticProperty.link( quadratic => {

        assert && assert( quadratic.isaParabola(), 'expected a parabola, quadratic=' + quadratic );

        // update the horizontal line
        const y = modelViewTransform.modelToViewY( quadratic.directrix );
        lineNode.setLine( minX, y, maxX, y );

        // update the equation's text
        equationText.text = GQEquationFactory.createDirectrix( quadratic.directrix );

        // position the equation to avoid overlapping vertex and x axis
        if ( quadratic.vertex.x >= 0 ) {

          // vertex is at or to the right of origin, so put equation on left end of line
          equationNode.left = modelViewTransform.modelToViewX( graph.xRange.min + GQConstants.EQUATION_X_MARGIN );
        }
        else {
          // vertex is to the left of origin, so put equation on right end of line
          equationNode.right = modelViewTransform.modelToViewX( graph.xRange.max - GQConstants.EQUATION_X_MARGIN );
        }

        // space between the equation and directrix
        if ( quadratic.directrix > graph.xRange.max - 1 ) {
          equationNode.top = lineNode.bottom + GQConstants.EQUATION_CURVE_SPACING;
        }
        else {
          equationNode.bottom = lineNode.top - GQConstants.EQUATION_CURVE_SPACING;
        }
      } );

      // visibility of this Node
      const visibleProperty = new DerivedProperty(
        [ directrixVisibleProperty, quadraticProperty ],
        ( directrixVisible, quadratic ) =>
          directrixVisible &&  // the Directrix checkbox is checked
          graph.yRange.contains( quadratic.directrix ) // the directrix (y=N) is on the graph
      );
      visibleProperty.linkAttribute( this, 'visible' );

      // visibility of equation
      equationsVisibleProperty.linkAttribute( equationNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'DirectrixNode', DirectrixNode );
} );