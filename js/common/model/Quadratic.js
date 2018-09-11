// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by the equation y = ax^2 + bx + c.
 *
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const EPSILON = 1e-8;

  class Quadratic {

    /**
     * @param {number} a - coefficient for the quadratic term
     * @param {number} b - coefficient for the linear term
     * @param {number} c - constant term
     * @param {Object} [options]
     */
    constructor( a, b, c, options ) {

      options = _.extend( {
        color: 'black' // {Color|String} color used to render the curve
      }, options );

      // @public (read-only)
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

        // @public (read-only) these will be undefined if a === 0
        this.axisOfSymmetry = h; // x = h
        this.vertex = new Vector2( h, k );
        this.focus = new Vector2( h, k + p );
        //TODO this.directrix = k - p
        this.directrix = new Line( 0, k - p, 1, k - p, GQColors.DIRECTRIX ); // y = k - p
        this.roots = Util.solveQuadraticRootsReal( a, b, c ).map( root => new Vector2( root, 0 ) ); // {Vector[]}
      }
      else {
        //TODO delete else clause after addressing directrix
        // This is not a quadratic because a is zero.
        this.directrix = null;
      }
    }

    /**
     * @returns {string}
     * @public
     */
    toString() {
      return StringUtils.fillIn( 'Quadratic {{a}}x^2 + {{b}}x + {{c}}, color={{color}}', {
        a: this.a,
        b: this.b,
        c: this.c,
        color: this.color
      } );
    }

    /**
     * Does this quadratic have roots?
     * @returns {boolean}
     * @public
     */
    hasRoots() {
     return this.roots && ( this.roots.length > 0 );
    }

    /**
     * Tests whether this quadratic is equal to the given
     * @param {*} quadratic
     * @returns {boolean}
     * @public
     */
    equals( quadratic ) {
      return ( quadratic instanceof Quadratic ) &&
             ( this.a === quadratic.a ) && ( this.b === quadratic.b ) && ( this.c === quadratic.c );
    }

    // @public Creates {Quadratic} copy, with a specified {Color} color
    withColor( color ) {
      return new Quadratic( this.a, this.b, this.c, { color: color } );
    }

    /**
     * Creates a quadratic given a, h, and k based on the equation y = a(x - h)^2 + k
     * @param {number} a
     * @param {number} h
     * @param {number} k
     * @param {Object} [options] - see Quadratic constructor
     * @returns {Quadratic}
     * @public
     */
    static createFromVertexForm( a, h, k, options ) {
      const b = -2 * a * h;
      const c = a * h * h + k;
      return new Quadratic( a, b, c, options );
    }

    /**
     * Gets the quadratic term, y = ax^2
     * @returns {Quadratic}
     */
    getQuadraticTerm() {
      return new Quadratic( this.a, 0, 0, { color: GQColors.QUADRATIC_TERM } );
    }

    /**
     * Gets the linear term, y = bx
     * @returns {Quadratic}
     */
    getLinearTerm() {
      return new Quadratic( 0, this.b, 0, { color: GQColors.LINEAR_TERM } );
    }

    /**
     * Gets the constant term, y = c
     * @returns {Quadratic}
     */
    getConstantTerm() {
      return new Quadratic( 0, 0, this.c, { color: GQColors.CONSTANT_TERM } );
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

    // @public Given {number} x, return the corresponding {Vector2} point on the quadratic
    solvePoint( x ) {
      return new Vector2( x, this.solveY( x ) );
    }

    // @private Given {number} x, solve for {number} y = ax^2 + bx + c
    solveY( x ) {
      return this.a * x * x + this.b * x + this.c;
    }

    /**
     * Does a specified point lie on this quadratic?
     * @param {Vector2} point
     * @returns {boolean}
     * @public
     */
    isOnQuadraticPoint( point ) {
      return ( Math.abs( this.solveY( point.x ) - point.y ) < EPSILON );
    }

    // @public Nearest point {Vector2} on this line to given {Vector2} point
    nearestPointOnLineToPoint( point ) {

      // http://mathworld.wolfram.com/Point-QuadraticDistance.html
      // TODO #22, math does not work well for cases of -1 < a < 1
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
  }

  return graphingQuadratics.register( 'Quadratic', Quadratic );
} );