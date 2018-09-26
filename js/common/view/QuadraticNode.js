// Copyright 2018, University of Colorado Boulder

/**
 * Draws a quadratic curve, labeled with an equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const QuadraticEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/QuadraticEquationFactory' );
  const Shape = require( 'KITE/Shape' );
  
  // constants
  const EQUATION_MARGIN = 1; // distance between equation and edge of graph, in model coordinate frame
  const EQUATION_SPACING = 4; // space between equation and line, in view coordinate frame

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {string} equationForm - form of the equation displayed on the line, see GQConstants.EQUATION_FORMS
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, equationForm, options ) {

      assert && assert( GQConstants.EQUATION_FORMS.includes( equationForm ),
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

      // Makes positioning and rotating the equation a little easier to grok.
      // equationParent will be rotated and translated, equationNode will be translated to adjusts spacing.
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

        // Position the equation.
        if ( quadratic.a === 0 ) {

          // straight line: equation above left end of line, in graph quadrants 2 or 3
          let x = xRange.min + EQUATION_MARGIN;
          let y = quadratic.solveY( x );
          if ( ( y > yRange.max - EQUATION_MARGIN ) || ( y < yRange.min + EQUATION_MARGIN ) ) {
            // y is off the graph, compute x
            y = ( y > yRange.max - EQUATION_MARGIN ) ? ( yRange.max - EQUATION_MARGIN ) : ( yRange.min + EQUATION_MARGIN );
            const xValues = quadratic.solveX( y );
            assert && assert( xValues && xValues.length === 1, 'unexpected xValues: ' + xValues );
            x = xValues[ 0 ];
          }

          // rotate to match line's slope
          equationParent.rotation = -Math.atan( quadratic.b );
          
          // move equation to (x,y)
          equationParent.translation = modelViewTransform.modelToViewXY( x, y );
          
          // space between line and equation
          equationNode.bottom = -EQUATION_SPACING;
        }
        else {

          // parabola: equation on outside of parabola, parallel to tangent, at edges of graph
          let x = ( quadratic.vertex.x >= 0 ) ? ( xRange.min + EQUATION_MARGIN ) : ( xRange.max - EQUATION_MARGIN );
          let y = quadratic.solveY( x );
          if ( ( y > yRange.max - EQUATION_MARGIN ) || ( y < yRange.min + EQUATION_MARGIN ) ) {
            // y is off the graph, compute x
            y = ( y > yRange.max - EQUATION_MARGIN ) ? ( yRange.max - EQUATION_MARGIN ) : ( yRange.min + EQUATION_MARGIN );
            const xValues = quadratic.solveX( y ).sort();
            assert && assert( xValues && xValues.length === 2, 'unexpected xValues: ' + xValues );
            x = ( quadratic.vertex.x >= 0 ) ? xValues[ 0 ] : xValues[ 1 ];
          }

          // rotate to match tangent's slope
          equationParent.rotation = -Math.atan( quadratic.getTangentSlope( x ) );

          // move equation to (x,y)
          if ( x > quadratic.vertex.x) {
            // when equation is on the right side, move it's origin to the right end of the equation
             equationNode.right = 0;
          }
          equationParent.translation = modelViewTransform.modelToViewXY( x, y );
          
          // space between line and equation
          if ( quadratic.a >= 0 ) {
            equationNode.top = EQUATION_SPACING;
          }
          else {
            equationNode.bottom = -EQUATION_SPACING;
          }
        }
      } );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );