// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by the equation y = ax^2 + bx + c.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const NotALine = require( 'GRAPHING_LINES/linegame/model/NotALine' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const EPSILON = 1e-8;

  class Quadratic {

    /**
     * @param {number} a - quadratic coefficient in the quadratic equation
     * @param {number} b - linear coefficient in the quadratic equation
     * @param {number} c - constant term in the quadratic equation
     * @param {Object} [options]
     */
    constructor( a, b, c, options ) {

      options = _.extend( {
        color: GQColors.INTERACTIVE_CURVE // {Color|String} color used to render the curve
      }, options );

      // @public
      this.a = a;
      this.b = b;
      this.c = c;
      this.color = options.color;

      // This is a quadratic because a is nonzero. Determine more information about it.
      if ( a !== 0 ) {

        // turn y = ax^2 + bx + c into 4p(y - k) = (x - h)^2
        // see http://jwilson.coe.uga.edu/emt668/emat6680.folders/brooks/assignments/Assign2/Coeffpar.html
        const h = -b / ( 2 * a );
        const k = c - b * b / ( 4 * a );
        const p = 1 / ( 4 * a );

        // @public
        this.vertex = new Vector2( h, k );
        this.axisOfSymmetry = new Line( h, 0, h, 1, GQColors.VERTEX ); // x = h;
        this.focus = new Vector2( h, k + p );
        this.directrix = new Line( 0, k - p, 1, k - p, GQColors.DIRECTRIX ); // y = k - p
        this.roots = Util.solveQuadraticRootsReal( a, b, c ).map( root => new Vector2( root, 0 ) );
      }
      else { // This is not a quadratic because a is zero.
        this.axisOfSymmetry = NotALine();
        this.directrix = NotALine();
      }
    }

    /**
     * Tests whether this quadratic is equal to the given
     * @param quadratic
     * @returns {boolean}
     * @public
     */
    equals( quadratic ) {
      return this.a === quadratic.a && this.b === quadratic.b && this.c === quadratic.c;
    }

    // @public Creates a {Quadratic} copy of this given a certain {Color} color
    withColor( color ) {
      return new Quadratic( this.a, this.b, this.c, { color: color } );
    }

    // @public Creates a new {Quadratic} quadratic based on just the ax^2 term of y=ax^2 + bx + c
    getQuadraticTerm() {
      return new Quadratic( this.a, 0, 0 ); // y = ax^2
    }

    // @public Creates a {Line} line based on just the bx term of y=ax^2 + bx + c
    getLinearTerm() {
      return new Line( 0, 0, 1, this.b, GQColors.LINEAR_TERM ); // y = bx
    }

    // @public Creates a {Line} line based on just the c term of y=ax^2 + bx + c
    getConstantTerm() {
      return new Line( 0, this.c, 1, this.c, GQColors.CONSTANT_TERM ); // y = c
    }

    /**
     * Given a graph for ranges, get control points for a bezier curve representing this quadratic
     * @param {Range} xRange
     * @returns {Object}
     * @public
     */
    getControlPoints( xRange ) {

      // given coefficients, calculate control points for the quadratic bezier curve
      // see https://github.com/phetsims/graphing-quadratics/issues/1
      const a = this.a;
      const b = this.b;
      const c = this.c;
      const minX = xRange.min;
      const maxX = xRange.max;
      const range = xRange.getLength();

      const aPrime = a * range * range;
      const bPrime = 2 * a * minX * range + b * range;
      const cPrime = a * minX * minX + b * minX + c;

      const startPoint = new Vector2( minX, cPrime );
      const controlPoint = new Vector2( ( minX + maxX ) / 2, bPrime / 2 + cPrime );
      const endPoint = new Vector2( maxX, aPrime + bPrime + cPrime );

      return { startPoint, controlPoint, endPoint };
    }

    // @public Given {number} x, return the corresponding point on the quadratic
    solvePoint( x ) {
      return new Vector2( x, this.solveY(x ) );
    }

    // @private Given {number} x, solve y = ax^2 + bx + c
    solveY( x ) {
      return this.a * x * x + this.b * x + this.c;
    }

    // @public Whether {Vector2} point lies on this quadratics
    onLinePoint( point ) {
      return this.onLineXY( point.x, point.y );
    }

    // @private
    onLineXY( x, y ) {
      return Math.abs( this.solveY( x ) - y ) < EPSILON;
    }

    // @public Nearest point {Vector2} on this line to given {Vector2} point
    nearestPointOnLineToPoint( point ) {

      // http://mathworld.wolfram.com/Point-QuadraticDistance.html
      // TODO: math does not work well for cases of -1 < a < 1
      const x = point.x;
      const y = point.y;
      const a = this.a; // a2
      const b = this.b; // a1
      const c = this.c; // a0
      const roots = Util.solveCubicRootsReal(
        2 * a * a,
        3 * a * b,
        b * b + 2 * a * c - 2 * a * y + 1/2, // should be 1 not 1/2
        b * c - b * y - x
      );
      let rootPoint;
      let nearestPoint = new Vector2( roots[ 0 ], this.solveY( roots[ 0 ] ) );
      for ( let i = 1; i < roots.length; i ++ ) {
        rootPoint = new Vector2( roots[ i ], this.solveY( roots[ i ] ) );
        if ( rootPoint.distance( point ) < nearestPoint.distance( point ) ) {
          nearestPoint = rootPoint;
        }
      }
      return nearestPoint;
    }

    /**
     * Creates a quadratic given a, h, and k based on the equation y = a(x - h)^2 + k
     * @param {number} a
     * @param {number} h
     * @param {number} k
     * @returns {Quadratic}
     * @public
     */
    static createFromVertexForm( a, h, k ) {
      const b = -2 * a * h;
      const c = a * h * h + k;
      return new Quadratic( a, b, c );
    }
  }

  return graphingQuadratics.register( 'Quadratic', Quadratic );
} );