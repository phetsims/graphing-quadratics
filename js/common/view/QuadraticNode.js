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
  const GQEquationNode = require( 'GRAPHING_QUADRATICS/common/view/GQEquationNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, options ) {

      options = _.extend( {

        // Path options
        lineWidth: 1
      }, options );

      super( options );

      // @private
      this.xRange = xRange;
      this.yRange = yRange; //TODO needed?
      this.modelViewTransform = modelViewTransform;

      // @protected quadratic curve, y = ax^2 + bx + c
      this.quadraticPath = new Path( null, {
        lineWidth: options.lineWidth
      } );
      this.addChild( this.quadraticPath );

      // @private
      this.equationNode = new GQEquationNode( quadraticProperty.value );
      this.addChild( this.equationNode );

      // Update the view of the curve when the quadratic model changes.
      quadraticProperty.link( quadratic => {

        // update line
        this.quadraticPath.shape = this.createQuadraticShape( quadratic );
        this.quadraticPath.stroke = quadratic.color;
        
        // update equation
        this.removeChild( this.equationNode );
        this.equationNode = new GQEquationNode( quadratic, {
          center: modelViewTransform.modelToViewPosition( new Vector2( -5, -5 ) ) //TODO position along the curve
        } );
        this.addChild( this.equationNode );
      } );
    }

    /**
     * Creates the shape for a specified Quadratic, using this Node's graph and modelViewTransform.
     * @param {Quadratic} quadratic
     * @returns {Shape}
     * @protected
     */
    createQuadraticShape( quadratic ) {

      // have model calculate the control points to draw a bezier curve shape
      const bezierControlPoints = quadratic.getControlPoints( this.xRange );

      // draw the quadratic
      return new Shape()
        .moveToPoint( bezierControlPoints.startPoint)
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
        .transformed( this.modelViewTransform.getMatrix() );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );