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
  const EquationFactory = require( 'GRAPHING_QUADRATICS/common/view/EquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
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
      this.xRange = xRange;
      this.yRange = yRange; //TODO needed?
      this.modelViewTransform = modelViewTransform;

      // @protected quadratic curve, y = ax^2 + bx + c
      this.quadraticPath = new Path( null, {
        lineWidth: options.lineWidth
      } );
      this.addChild( this.quadraticPath );

      // @private created below
      this.equationNode = null;

      // Update the view of the curve when the quadratic model changes.
      quadraticProperty.link( quadratic => {

        // update line
        this.quadraticPath.shape = this.createQuadraticShape( quadratic );
        this.quadraticPath.stroke = quadratic.color;
        
        // update equation
        if ( this.equationNode ) {
          this.removeChild( this.equationNode );
        }
        if ( equationForm === 'standard' ) {
          this.equationNode = EquationFactory.createStandardForm( quadratic );
        }
        else {
          this.equationNode = EquationFactory.createVertexForm( quadratic );
        }
        this.addChild( this.equationNode );

        //TODO position the equation
        this.equationNode.left = modelViewTransform.modelToViewX( xRange.min ) + 20;
        this.equationNode.bottom = modelViewTransform.modelToViewY( yRange.min ) - 20;
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