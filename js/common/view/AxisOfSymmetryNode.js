// Copyright 2018, University of Colorado Boulder

/**
 * Displays the axis of symmetry for a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );

  class AxisOfSymmetryNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     */
    constructor( quadraticProperty, graph, modelViewTransform,
                 axisOfSymmetryVisibleProperty, equationsVisibleProperty ) {

      super();

      // vertical line
      const lineNode = new Line( 0, 0, 0, 1, {
        stroke: GQColors.AXIS_OF_SYMMETRY,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );
      this.addChild( lineNode );

      // equation on the line, created below
      let equationNode = null;

      // endpoints of the line in model coordinates, note that y is inverted
      const minY = modelViewTransform.modelToViewY( graph.yRange.max );
      const maxY = modelViewTransform.modelToViewY( graph.yRange.min );

      quadraticProperty.link( quadratic => {

        if ( quadratic.axisOfSymmetry !== undefined ) {
          assert && assert( quadratic.vertex, 'expected vertex: ' + quadratic.vertex );

          // update the vertical line
          const x = modelViewTransform.modelToViewX( quadratic.axisOfSymmetry );
          lineNode.setLine( x, minY, x, maxY );

          // update the equation
          equationNode && this.removeChild( equationNode );
          equationNode = GQEquationFactory.createAxisOfSymmetry( quadratic.axisOfSymmetry );
          equationNode.maxHeight = 100; // maxHeight because equation is rotated, determined empirically
          equationNode.visible = equationsVisibleProperty.value;
          this.addChild( equationNode );

          // position the equation to avoid overlapping vertex and y axis
          if ( quadratic.axisOfSymmetry > graph.yRange.max - GQConstants.EQUATION_Y_MARGIN ) {

            // axis is at far right of graph, so put equation on left of axis
            equationNode.right = lineNode.left - GQConstants.EQUATION_SPACING;
          }
          else if ( quadratic.axisOfSymmetry < graph.yRange.min + GQConstants.EQUATION_Y_MARGIN ) {

            // axis is at far left of graph, so put equation on right of axis
            equationNode.left = lineNode.right + GQConstants.EQUATION_SPACING;
          }
          else if ( quadratic.axisOfSymmetry >= 0 ) {

            // axis is at or to right of origin, so put equation on left of axis
            equationNode.left = lineNode.right + GQConstants.EQUATION_SPACING;
          }
          else {

            // axis is to left of origin, os put equation on right of axis
            equationNode.right = lineNode.left - GQConstants.EQUATION_SPACING;
          }

          // space between the equation and axis
          if ( quadratic.vertex.y >= 0 ) {
            equationNode.bottom = modelViewTransform.modelToViewY( graph.yRange.min + 1 );
          }
          else {
            equationNode.top = modelViewTransform.modelToViewY( graph.yRange.max - 1 );
          }
        }
      } );

      // visibility of this Node
      const visibleProperty = new DerivedProperty(
        [ axisOfSymmetryVisibleProperty, quadraticProperty ],
        ( axisOfSymmetryVisible, quadratic ) =>
          axisOfSymmetryVisible && // the Axis of Symmetry checkbox is checked
          quadratic.axisOfSymmetry !== undefined && // the quadratic has an axis of symmetry
          graph.xRange.contains( quadratic.axisOfSymmetry ) // the axis of symmetry (x=N) is on the graph
      );
      visibleProperty.linkAttribute( this, 'visible' );

      // visibility of the equation                                                
      equationsVisibleProperty.linkAttribute( equationNode, 'visible' );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
} );