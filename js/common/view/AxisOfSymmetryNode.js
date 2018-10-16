// Copyright 2018, University of Colorado Boulder

/**
 * Displays the axis of symmetry for a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  class AxisOfSymmetryNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     */
    constructor( quadraticProperty, yRange, modelViewTransform,
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

      // to improve readability
      const minY = modelViewTransform.modelToViewY( yRange.max );
      const maxY = modelViewTransform.modelToViewY( yRange.min );

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
          this.addChild( equationNode );

          // position the equation to avoid overlapping vertex and y axis
          if ( quadratic.axisOfSymmetry > yRange.max - GQConstants.EQUATION_Y_MARGIN ) {

            // axis is at far right of graph, so put equation on left of axis
            equationNode.right = lineNode.left - GQConstants.EQUATION_SPACING;
          }
          else if ( quadratic.axisOfSymmetry < yRange.min + GQConstants.EQUATION_Y_MARGIN ) {

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
            equationNode.bottom = modelViewTransform.modelToViewY( yRange.min + 1 );
          }
          else {
            equationNode.top = modelViewTransform.modelToViewY( yRange.max - 1 );
          }
        }
      } );

      Property.multilink( [ axisOfSymmetryVisibleProperty, quadraticProperty ],
        ( axisOfSymmetryVisible, quadratic ) => {
          this.visible = !!( axisOfSymmetryVisible &&
                             quadratic.axisOfSymmetry !== undefined &&
                             yRange.contains( quadratic.axisOfSymmetry ) );
        } );

      equationsVisibleProperty.link( visible => { equationNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
} );