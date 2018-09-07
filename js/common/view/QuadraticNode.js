// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic curve.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

      options = _.extend( {}, options );

      super( options );

      // @private
      this.graph = graph;
      this.modelViewTransform = modelViewTransform;

      // @protected quadratic curve, y = ax^2 + bx + c
      this.quadraticPath = new Path( null, {
        stroke: GQColors.INTERACTIVE_CURVE,
        lineWidth: GQConstants.INTERACTIVE_CURVE_LINE_WIDTH
      } );
      this.addChild( this.quadraticPath );

      // Update the view of the curve when the quadratic model changes. dispose not needed.
      quadraticProperty.link( quadratic => {
        this.quadraticPath.setShape( this.createQuadraticShape( quadratic ) );
      } );
    }

    /**
     * Create a quadratic Path.
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @returns {Path}
     * @public
     */
    createQuadraticPath( quadratic, options ) {
      return new Path( this.createQuadraticShape( quadratic ), options );
    }

    /**
     * Create a quadratic shape. Assumes same graph and modelViewTransform as this one.
     * @param {Quadratic} quadratic
     * @returns {Shape}
     * @private
     */
    createQuadraticShape( quadratic ) {

      // have model calculate the control points to draw a bezier curve shape
      const bezierControlPoints = quadratic.getControlPoints( this.graph.xRange );

      // draw the quadratic
      return new Shape()
        .moveToPoint( bezierControlPoints.startPoint)
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
        .transformed( this.modelViewTransform.getMatrix() );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );