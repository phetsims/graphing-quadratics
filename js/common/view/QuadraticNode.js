// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Quadratic} quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function QuadraticNode( quadratic, graph, modelViewTransform, options ) {

    options = _.extend( {}, options );

    Node.call( this, options );

    this.quadratic = quadratic; // @public
    this.graph = graph; // @private
    this.modelViewTransform = modelViewTransform; // @private

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

    var quadraticPath = new Path( quadraticShape, {
      stroke: 'red',
      lineWidth: 3
    } );

    this.addChild( quadraticPath );
    }

  graphingQuadratics.register( 'QuadraticNode', QuadraticNode );

  return inherit( Node, QuadraticNode );
} );