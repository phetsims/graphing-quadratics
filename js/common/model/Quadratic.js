// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by the equation y = ax^2 + bx + c.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const EPSILON = 1e-8;  // how close is considered to be "on" the quadratic

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

      // @public (read-only) {Vector2[]|null} null means that all points are roots (y = 0)
      this.roots = Quadratic.solveRoots( a, b, c );

      // Strictly speaking, we don't have a quadratic if a === 0.
      // If that's the case, then the fields herein will be undefined.
      if ( a !== 0 ) {

        // @public (read-only) derive coefficients for vertex form
        this.p = 1 / ( 4 * a );
        this.h = -b / ( 2 * a );
        this.k = c - ( ( b * b ) / ( 4 * a ) );

        // @public (read-only)
        this.vertex = new Vector2( this.h, this.k );
        this.focus = new Vector2( this.h, this.k + this.p );
        this.directrix = this.k - this.p; // y = directrix
        this.axisOfSymmetry = this.h; // x = h
      }
    }

    /**
     * Returns a string representation of this Quadratic. For debugging only, do not rely on format!
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
     * Tests whether this quadratic is equal to the given quadratic.
     * @param {*} quadratic
     * @returns {boolean}
     * @public
     */
    equals( quadratic ) {
      return ( quadratic instanceof Quadratic ) &&
             ( this.a === quadratic.a ) && ( this.b === quadratic.b ) && ( this.c === quadratic.c );
    }

    /**
     * Returns a copy of this Quadratic with a specified color.
     * @param {Color|String} color
     * @returns {Quadratic}
     * @public
     */
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
     * Creates a quadratic given p, h, k, based on the equation y = (1/(4p))(x - h)^2 + k
     * This is an alternate vertex form, where 1/4p is substituted for a.
     * @param {number} p
     * @param {number} h
     * @param {number} k
     * @param {Object} [options] - see Quadratic constructor
     * @returns {Quadratic}
     * @public
     */
    static createFromAlternateVertexForm( p, h, k, options ) {
      const a = 1 / ( 4 * p );
      return Quadratic.createFromVertexForm( a, h, k, options );
    }

    /**
     * Returns the real roots of the quadratic y = ax^2 + bx + c.
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @returns {Vector2[]|null} null means that all points are roots (y = 0)
     * @private
     */
    static solveRoots( a, b, c ) {
      let roots = null;
      const xCoordinates = Util.solveQuadraticRootsReal( a, b, c );
      if ( xCoordinates !== null ) {
        roots = [];
        _.uniq( xCoordinates ).forEach( x => { roots.push( new Vector2( x, 0 ) ); } );
      }
      assert && assert( roots === null || ( roots.length >= 0 && roots.length <= 2 ), 'unexpected roots: ' + roots );
      return roots;
    }

    /**
     * Gets the quadratic term, y = ax^2
     * @returns {Quadratic}
     * @public
     */
    getQuadraticTerm() {
      return new Quadratic( this.a, 0, 0, { color: GQColors.QUADRATIC_TERM } );
    }

    /**
     * Gets the linear term, y = bx
     * @returns {Quadratic}
     * @public
     */
    getLinearTerm() {
      return new Quadratic( 0, this.b, 0, { color: GQColors.LINEAR_TERM } );
    }

    /**
     * Gets the constant term, y = c
     * @returns {Quadratic}
     * @public
     */
    getConstantTerm() {
      return new Quadratic( 0, 0, this.c, { color: GQColors.CONSTANT_TERM } );
    }

    /**
     * Gets the control points for the Bezier curve that describes this quadratic.
     * @param {Range} xRange - range of the graph's x axis
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

      return { startPoint, controlPoint, endPoint }; // caution! ES6 object shorthand
    }

    /**
     * Given x, solve the quadratic for y.
     * @param {number} x
     * @returns {number}
     * @public
     */
    solveY( x ) {
      return this.a * x * x + this.b * x + this.c;
    }

    /**
     * Given y, solve the quadratic for x. There will be 2 solutions.
     * @param {number} y
     * @returns {number[]}
     * @public
     */
    solveX( y ) {
      assert && assert( this.a !== 0, 'solveX is unsupported when a === 0' );
      const commonTerm = Math.sqrt( ( this.b * this.b ) - ( 4 * this.a * this.c ) );
      const x1 = ( -this.b + commonTerm ) / ( 2 * this.a );
      const x2 = ( -this.b - commonTerm ) / ( 2 * this.a );
      return [ x1, x2 ];
    }

    /**
     * Does a specified point lie on this quadratic?
     * @param {Vector2} point
     * @returns {boolean}
     * @public
     */
    isOnQuadratic( point ) {
      return ( Math.abs( this.solveY( point.x ) - point.y ) < EPSILON );
    }

    /**
     * Gets the point on this quadratic that is closest to a specified point.
     * @param {Vector2} point
     * @returns {Vector2}
     * @public
     */
    getClosestPoint( point ) {

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