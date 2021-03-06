// Copyright 2018-2021, University of Colorado Boulder

/**
 * Displays the axis of symmetry for a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQBackgroundNode from './GQBackgroundNode.js';
import GQEquationFactory from './GQEquationFactory.js';

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

    // text of the equation
    const equationText = new RichText( '', {
      font: GQConstants.GRAPHED_EQUATION_FONT,
      fill: GQColors.AXIS_OF_SYMMETRY,
      rotation: Math.PI / 2
    } );

    // equation text on a translucent background
    const equationNode = new GQBackgroundNode( equationText, {
      visibleProperty: equationsVisibleProperty,
      maxHeight: 100 // maxHeight because equation is rotated, determined empirically
    } );
    this.addChild( equationNode );

    // endpoints of the line in model coordinates, note that y is inverted
    const minY = modelViewTransform.modelToViewY( graph.yRange.max );
    const maxY = modelViewTransform.modelToViewY( graph.yRange.min );

    // update if the interactive quadratic is a parabola, and therefore has an axis of symmetry
    quadraticProperty.link( quadratic => {

      if ( quadratic.isaParabola() ) {

        // update the vertical line
        const x = modelViewTransform.modelToViewX( quadratic.axisOfSymmetry );
        lineNode.setLine( x, minY, x, maxY );

        // update the equation's text
        equationText.text = GQEquationFactory.createAxisOfSymmetry( quadratic.axisOfSymmetry );

        // position the equation to avoid overlapping vertex and y axis
        if ( quadratic.axisOfSymmetry > graph.yRange.max - GQConstants.EQUATION_Y_MARGIN ) {

          // axis is at far right of graph, so put equation on left of axis
          equationNode.right = lineNode.left - GQConstants.EQUATION_CURVE_SPACING;
        }
        else if ( quadratic.axisOfSymmetry < graph.yRange.min + GQConstants.EQUATION_Y_MARGIN ) {

          // axis is at far left of graph, so put equation on right of axis
          equationNode.left = lineNode.right + GQConstants.EQUATION_CURVE_SPACING;
        }
        else if ( quadratic.axisOfSymmetry >= 0 ) {

          // axis is at or to right of origin, so put equation on left of axis
          equationNode.left = lineNode.right + GQConstants.EQUATION_CURVE_SPACING;
        }
        else {

          // axis is to left of origin, os put equation on right of axis
          equationNode.right = lineNode.left - GQConstants.EQUATION_CURVE_SPACING;
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
        quadratic.isaParabola() && // the quadratic is a parabola, so has an axis of symmetry
        graph.xRange.contains( quadratic.axisOfSymmetry ) // the axis of symmetry (x=N) is on the graph
    );
    visibleProperty.linkAttribute( this, 'visible' );
  }
}

graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
export default AxisOfSymmetryNode;