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
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const QuadraticEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/QuadraticEquationFactory' );
  const Range = require( 'DOT/Range' );
  const Shape = require( 'KITE/Shape' );

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {string} equationForm - form of the equation displayed on the line, see GQConstants.EQUATION_FORMS
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, equationForm,
                 equationsVisibleProperty, options ) {

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

      // ranges for equation placement, just inside the edges of the graph
      const xEquationRange =
        new Range( xRange.min + GQConstants.EQUATION_X_MARGIN, xRange.max - GQConstants.EQUATION_X_MARGIN );
      const yEquationRange =
        new Range( yRange.min + GQConstants.EQUATION_Y_MARGIN, yRange.max - GQConstants.EQUATION_Y_MARGIN );

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
        
        // if ?dev, display a black dot at the equation's origin, for debugging positioning
        if ( phet.chipper.queryParameters.dev ) {
          equationParent.addChild( new Circle( 3, { fill: 'black' } ) );
        }

        // Position the equation.
        if ( quadratic.a === 0 ) {

          // straight line: equation above left end of line
          const x = xEquationRange.min;
          const p = quadratic.getClosestPointInRange( x, xEquationRange, yEquationRange );
          assert && assert( xRange.contains( p.x ) && yRange.contains( p.y ), 'p is off the graph: ' + p );

          // rotate to match line's slope
          equationParent.rotation = -Math.atan( quadratic.b );

          // move equation to (x,y)
          equationParent.translation = modelViewTransform.modelToViewPosition( p );

          // space between line and equation
          equationNode.bottom = -GQConstants.EQUATION_SPACING;
        }
        else {

          // parabola: equation on outside of parabola, parallel to tangent, at edges of graph
          const x = ( quadratic.vertex.x >= 0 ) ? xEquationRange.min : xEquationRange.max;
          const p = quadratic.getClosestPointInRange( x, xEquationRange, yEquationRange );
          assert && assert( xRange.contains( p.x ) && yRange.contains( p.y ), 'p is off the graph: ' + p );

          // rotate to match tangent's slope
          equationParent.rotation = -Math.atan( quadratic.getTangentSlope( p.x ) );

          // move equation to (x,y)
          equationParent.translation = modelViewTransform.modelToViewPosition( p );

          // when equation is on the right side of parabola, move it's origin to the right end of the equation
          if ( p.x > quadratic.vertex.x ) {
            equationNode.right = 0;
          }

          // space between line and equation
          if ( quadratic.a >= 0 ) {
            equationNode.top = GQConstants.EQUATION_SPACING;
          }
          else {
            equationNode.bottom = -GQConstants.EQUATION_SPACING;
          }
        }
      } );

      equationsVisibleProperty.link( visible => { equationParent.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );