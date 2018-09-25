// Copyright 2018, University of Colorado Boulder

/**
 * Draws a quadratic curve.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const QuadraticEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/QuadraticEquationFactory' );
  const Shape = require( 'KITE/Shape' );

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {string} equationForm
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, equationForm, options ) {

      assert && assert( equationForm === 'standard' || equationForm === 'vertex',
        'invalid equationForm: ' + equationForm );

      options = _.extend( {

        // Path options
        lineWidth: 1
      }, options );

      super( options );

      // @private
      this.modelViewTransform = modelViewTransform;

      // @protected quadratic curve, y = ax^2 + bx + c
      this.quadraticPath = new Path( null, {
        lineWidth: options.lineWidth
      } );
      this.addChild( this.quadraticPath );

      // makes positioning and rotating the equation a little easier to grok
      const equationParent = new Node();
      this.addChild( equationParent );

      quadraticProperty.link( quadratic => {

        // update shape
        const bezierControlPoints = quadratic.getControlPoints( xRange );
        this.quadraticPath.shape = new Shape()
          .moveToPoint( bezierControlPoints.startPoint )
          .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
          .transformed( modelViewTransform.getMatrix() );

        // update color
        this.quadraticPath.stroke = quadratic.color;
        
        // update equation
        equationParent.removeAllChildren();
        let equationNode = null;
        if ( equationForm === 'standard' ) {
          equationNode = QuadraticEquationFactory.createStandardForm( quadratic );
        }
        else {
          equationNode = QuadraticEquationFactory.createVertexForm( quadratic );
        }
        equationParent.addChild( equationNode );

        // position the equation
        const equationMargin = 1; // distance from edge of graph, in model coordinate frame
        if ( quadratic.a === 0 ) {

          // straight line, equation above left end of line

          // determine x & y model coordinates, in graph quadrants 2 or 3
          let x = xRange.min + equationMargin;
          let y = quadratic.solveY( x );
          if ( ( y > yRange.max - equationMargin ) || ( y < yRange.min + equationMargin ) ) {
            // y is off the graph, compute x
            y = ( y > yRange.max - equationMargin ) ? ( yRange.max - equationMargin ) : ( yRange.min + equationMargin );
            x = ( y - quadratic.c ) / quadratic.b; // y = bx + c => x = (y-c)/b
          }

          equationParent.rotation = -Math.atan( quadratic.b ); // rotate to match line's slope
          equationParent.translation = modelViewTransform.modelToViewXY( x, y );
          equationNode.bottom = -4;
        }
        else {
          // parabola
          //TODO temporarily in lower-left corner of graph
          equationParent.rotation = 0;
          equationParent.left = modelViewTransform.modelToViewX( xRange.min + equationMargin );
          equationParent.bottom = modelViewTransform.modelToViewY( yRange.min + equationMargin );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );