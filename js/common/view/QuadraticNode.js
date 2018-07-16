// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic curve.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Property.<Quadratic>} quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function QuadraticNode( quadraticProperty, graph, modelViewTransform, options ) {

    options = _.extend( {}, options );

    Node.call( this, options );

    var quadraticPath = new Path( null, {
      stroke: 'red',
      lineWidth: 3
    } );

    var pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

    var vertexPoint = new PlottedPointNode( pointRadius, 'red' );
    var focusPoint = new PlottedPointNode( pointRadius, 'green' );

    // the left most root if there are two roots, and the root if there is one root
    var root0Point = new PlottedPointNode( pointRadius, 'red' );

    // the right most root if there are two roots
    var root1Point = new PlottedPointNode( pointRadius, 'red' );

    // make a property out of quadraticProperty.get().axisOfSymmetry in order to pass into LineNode
    var axisOfSymmetryLineProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.axisOfSymmetry;
    } );

    var axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
      stroke: 'purple',
      lineWidth: 3,
      lineDash: [ 5, 5 ]
    } );

    // TODO: create an options in graphing-lines/Line-Node so that the above options are passed through

    // rendering order
    this.addChild( quadraticPath );
    this.addChild( axisOfSymmetryLine );
    this.addChild( vertexPoint );
    this.addChild( focusPoint );
    this.addChild( root0Point );
    this.addChild( root1Point );

    // Update the view of the curve when the quadratic model changes
    // TODO: dispose
    quadraticProperty.link( function( quadratic ) {

      // given coefficients, calculate control points for the quadratic bezier curve
      // see https://github.com/phetsims/graphing-quadratics/issues/1
      var a = quadratic.a;
      var b = quadratic.b;
      var c = quadratic.c;
      var minX = graph.xRange.min;
      var maxX = graph.xRange.max;
      var xRange = graph.xRange.getLength();

      var aPrime = a * xRange * xRange;
      var bPrime = 2 * a * minX * xRange + b * xRange;
      var cPrime = a * minX * minX + b * minX + c;

      var startPoint = new Vector2( minX, cPrime );
      var controlPoint = new Vector2( ( minX + maxX ) / 2, bPrime / 2 + cPrime );
      var endPoint = new Vector2( maxX, aPrime + bPrime + cPrime );

      // draw the quadratic
      var quadraticShape = new Shape()
        .moveToPoint( startPoint)
        .quadraticCurveToPoint( controlPoint, endPoint )
        .transformed( modelViewTransform.getMatrix() )
      ;

      quadraticPath.setShape( quadraticShape );

      // update other information about the quadratic curve
      if ( a !== 0 ) {
        vertexPoint.center = modelViewTransform.modelToViewPosition( quadratic.vertex );
        focusPoint.center = modelViewTransform.modelToViewPosition( quadratic.focus );
        vertexPoint.visible = true;
        focusPoint.visible = true;

        if ( quadratic.roots.length === 2 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root1Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 1 ] );
          root0Point.visible = true;
          root1Point.visible = true;
        }
        else if ( quadratic.roots.length === 1 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root0Point.visible = true;
          root1Point.visible = false;

        }
        else { // no real roots
          root0Point.visible = false;
          root1Point.visible = false;
        }
      }
      else { // not quadratic
        vertexPoint.visible = false;
        focusPoint.visible = false;
        root0Point.visible = false;
        root1Point.visible = false;
      }
    } );

  }

  graphingQuadratics.register( 'QuadraticNode', QuadraticNode );

  return inherit( Node, QuadraticNode );
} );