// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by these equations:
 *
 * standard form: y = ax^2 + bx + c
 * vertex form: y = a(x - h)^2 + k
 * alternate vertex form: y = (1/(4p))(x - h)^2 + k
 *
 * Note that this implementation supports only parabolas that open up or down.  It does not support parabolas that
 * open left or right, which would be described by x = ay^2 + by + c.
 *
 * Typically, a quadratic requires a !== 0. But this sim is required to support a === 0.
 * So there is some non-standard behavior herein that is not exactly mathematically correct.
 * Specifically:
 *
 * (1) When a === 0, Quadratic behaves like a straight line.  See for example solveX.
 *
 * (2) When a === 0, y = c (standard form) and y = k (vertex form) describe the same horizontal line.
 *     See for example createFromVertexForm.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  class Quadratic {

    /**
     * The constructor uses the standard form equation y = ax^2 + bx +c
     * @param {number} a - coefficient for the quadratic term
     * @param {number} b - coefficient for the linear term
     * @param {number} c - constant term
     * @param {Object} [options]
     */
    constructor( a, b, c, options ) {

      options = _.extend( {
        color: 'black' // {Color|string} color used to render the curve
      }, options );

      // @public (read-only)
      this.a = a;
      this.b = b;
      this.c = c;
      this.color = options.color;

      // @public (read-only) {Vector2[]|null} null means that all points are roots (y = 0)
      this.roots = solveRoots( a, b, c );

      // Strictly speaking, we don't have a quadratic if a === 0.
      // If that's the case, then the fields in this if block will be undefined.
      if ( a !== 0 ) {

        // @public (read-only) derive coefficients for vertex form, y = (1/(4p))(x - h)^2 + k
        this.p = 1 / ( 4 * a );
        this.h = -b / ( 2 * a );
        this.k = c - ( ( b * b ) / ( 4 * a ) );

        // @public (read-only)
        this.vertex = new Vector2( this.h, this.k );
        this.focus = new Vector2( this.h, this.k + this.p );
        this.directrix = this.k - this.p; // y = directrix
        this.axisOfSymmetry = this.h; // x = h
      }
      else {
        this.k = c; // to support y = k when a === 0 in vertex form
      }
    }

    /**
     * Returns a copy of this Quadratic with a specified color.
     * @param {Color|string} color
     * @returns {Quadratic}
     * @public
     */
    withColor( color ) {
      return new Quadratic( this.a, this.b, this.c, { color: color } );
    }

    /**
     * Creates a Quadratic based on the vertex form equation y = a(x - h)^2 + k
     * @param {number} a
     * @param {number} h
     * @param {number} k
     * @param {Object} [options] - see Quadratic constructor
     * @returns {Quadratic}
     * @public
     */
    static createFromVertexForm( a, h, k, options ) {
      if ( a !== 0 ) {
        const b = -2 * a * h;
        const c = ( a * h * h ) + k;
        return new Quadratic( a, b, c, options );
      }
      else {
        // to support y = k when a === 0 in vertex form
        return new Quadratic( 0, 0, k, options );
      }
    }

    /**
     * Creates a Quadratic based on the equation y = (1/(4p))(x - h)^2 + k
     * This is an alternate vertex form, where 1/(4p) is substituted for a.
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
     * Encodes a Quadratic instance as a PhET-iO state object
     * @returns {*}
     * @public
     */
    toStateObject() {
      return {

        // These properties are sufficient to restore a Quadratic, see fromStateObject.
        a: this.a,
        b: this.b,
        c: this.c,
        color: Color.toColor( this.color ).toStateObject(),

        // These properties are desired in the data stream, but will be undefined for non-parabolas (a===0).
        // Because PhET-iO values are based on JSON.stringify, undefined properties will not be present in the
        // data stream.
        p: this.p,
        h: this.h,
        k: this.k,
        vertex: ( this.vertex ? this.vertex.toStateObject() : undefined ),
        focus: ( this.focus ? this.focus.toStateObject() : undefined ),
        directrix: this.directrix,
        axisOfSymmetry: this.axisOfSymmetry
      };
    }

    /**
     * Decodes a PhET-iO state object and produces a Quadratic instance
     * @param {*} object
     * @returns {Quadratic}
     * @public
     */
    static fromStateObject( object ) {
      return new Quadratic( object.a, object.b, object.c, {
        color: Color.fromStateObject( object.color )
      } );
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
     * Given y, solve for x.
     * If there is more than on solution, they will be in ascending order.
     * @param {number} y
     * @returns {number[]|null} - one or more solutions, null if there is no solution
     * @public
     */
    solveX( y ) {
      if ( this.a !== 0 ) {

        if ( ( this.a > 0 && y < this.vertex.y ) || ( this.a < 0 && y > this.vertex.y ) ) {

          // there is no solution, y is not on the parabola
          return null;
        }
        else {

          // For a parabola, use vertex form.
          // y = a(x - h)^2 + k => x = h +- Math.sqrt((y - k)/a)
          // This yields 2 solutions
          const commonTerm = Math.sqrt( ( y - this.k ) / this.a );
          const x0 = this.h - commonTerm;
          const x1 = this.h + commonTerm;
          return [ x0, x1 ].sort( ( x0, x1 ) => x0 - x1 ); // in ascending order
        }
      }
      else {
        
        // For a straight line, use slope-intercept form.
        // y = bx + c => x = (y - c)/b
        // This yields one solution.
        const x0 = ( y - this.c ) / this.b;
        return [ x0 ];
      }
    }

    /**
     * Given x, solve for y.
     * @param {number} x
     * @returns {number}
     * @public
     */
    solveY( x ) {
      return ( this.a * x * x ) + ( this.b * x ) + this.c; // y = ax^2 + bx + c
    }

    /**
     * Gets the slope of the tangent line at point (x,f(x)) on the quadratic.
     * @param {number} x
     * @returns {number}
     */
    getTangentSlope( x ) {
      assert && assert( this.a !== 0, 'not supported for non-parabola' );
      return ( 2 * this.a * x ) + this.b; // first derivative
    }

    /**
     * Gets the control points for the Bezier curve that describes this quadratic.
     * See https://github.com/phetsims/graphing-quadratics/issues/1
     * @param {Range} xRange - range of the graph's x axis
     * @returns {startPoint:Vector2, controlPoint:Vector2, endPoint:Vector2}
     * @public
     */
    getControlPoints( xRange ) {

      const minX = xRange.min;
      const maxX = xRange.max;
      const length = xRange.getLength();

      const aPrime = this.a * length * length;
      const bPrime = ( 2 * this.a * minX * length ) + ( this.b * length );
      const cPrime = ( this.a * minX * minX ) + ( this.b * minX ) + this.c;

      const startPoint = new Vector2( minX, cPrime );
      const controlPoint = new Vector2( ( minX + maxX ) / 2, bPrime / 2 + cPrime );
      const endPoint = new Vector2( maxX, aPrime + bPrime + cPrime );

      return { startPoint, controlPoint, endPoint }; // caution! ES6 object shorthand
    }

    /**
     * Does a specified point lie on this quadratic?
     * @param {Vector2} point
     * @param {number} epsilon - how close is considered to be "on" the quadratic
     * @returns {boolean}
     * @public
     */
    isOnQuadratic( point, epsilon ) {
      assert && assert( epsilon >= 0, 'invalid epsilon: ' + epsilon );
      return ( Math.abs( this.solveY( point.x ) - point.y ) < epsilon );
    }

    /**
     * Gets the point on this quadratic that is closest to a specified point.
     * @param {Vector2} point
     * @returns {Vector2}
     * @public
     */
    getClosestPoint( point ) {

      // to improve readability
      const x0 = point.x;
      const y0 = point.y;
      const a = this.a;
      const b = this.b;
      const c = this.c;

      // Finding the closest point requires solving the cubic equation
      // (2a^2)x^3 + (3ab)x^2 + (b^2 + 2ac - 2ay0 + 1)x + (bc - by0 - x0) = 0
      // See http://mathworld.wolfram.com/Point-QuadraticDistance.html
      const roots = Util.solveCubicRootsReal(
        2 * a * a,
        3 * a * b,
        b * b + 2 * a * c - 2 * a * y0 + 1,
        b * c - b * y0 - x0
      );
      assert && assert( roots, 'all values are roots' );
      assert && assert( roots.length > 0, 'unexpected number of roots: ' + roots.length );

      // Determine which solution is closest to point (x0,y0)
      let rootPoint;
      let nearestPoint = new Vector2( roots[ 0 ], this.solveY( roots[ 0 ] ) );
      for ( let i = 1; i < roots.length; i++ ) {
        rootPoint = new Vector2( roots[ i ], this.solveY( roots[ i ] ) );
        if ( rootPoint.distance( point ) < nearestPoint.distance( point ) ) {
          nearestPoint = rootPoint;
        }
      }

      return nearestPoint;
    }

    /**
     * Given x, find the closest (x,y) point on the quadratic that is in range.
     * @param {number} x
     * @param {Range} xRange
     * @param {Range} yRange
     * @returns {Vector2}
     */
    getClosestPointInRange( x, xRange, yRange ) {

      // constrain x and solve for y
      x = xRange.constrainValue( x );
      let y = this.solveY( x );

      if ( !yRange.contains( y ) ) {

        // y is outside range, constrain y and solve for x
        y = yRange.constrainValue( y );
        const xValues = this.solveX( y );
        assert && assert( xValues, 'No solution exists, the parabola is likely off the graph. ' +
                                   'x=' + x + ', quadratic=' + this.toString() );

        if ( this.a !== 0 ) {

          // parabola
          assert && assert( xValues.length === 2, 'unexpected number of xValues: ' + xValues );
          assert && assert( xValues[ 0 ] < xValues[ 1 ], 'unexpected order of xValues: ' + xValues );
          x = ( x < this.vertex.x ) ? xValues[ 0 ] : xValues[ 1 ];
        }
        else {

          // straight line
          assert && assert( xValues.length === 1, 'unexpected number of xValues: ' + xValues );
          x = xValues[ 0 ];
        }
      }

      return new Vector2( x, y );
    }
  }

  /**
   * Returns the real roots of the quadratic y = ax^2 + bx + c.
   * If there is more than one roots, they will be in ascending order of x coordinate.
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @returns {Vector2[]|null} null means that all points are roots (y = 0)
   */
  function solveRoots( a, b, c ) {
    let roots = null;
    let xCoordinates = Util.solveQuadraticRootsReal( a, b, c );
    if ( xCoordinates !== null ) {
      roots = [];
      xCoordinates = xCoordinates.sort( ( x0, x1 ) => x0 - x1 ); // in ascending order
      _.uniq( xCoordinates ).forEach( x => { roots.push( new Vector2( x, 0 ) ); } );
    }
    assert && assert( roots === null || ( roots.length >= 0 && roots.length <= 2 ), 'unexpected roots: ' + roots );
    return roots;
  }

  /**
   * Documentation for the association IO type, QuadraticIO.  This appears in PhET-iO Studio.
   * Defined here so that specifics about Quadratic appear in one place.
   * @type {string}
   * @public
   */
  Quadratic.documentationQuadraticIO =
    'QuadraticIO is a data structure that describes a quadratic equation in the model. ' +
    'Its properties are relevant to standard and vertex forms of the quadratic equation. ' +
    'Non-parabolas (a=0) will have a subset of the properties that parabolas have. ' +
    '<p>' +
    'Required properties are related to the standard form y = ax<sup>2</sup> + bx + c, and include:' +
    '</p>' +
    '<ul>' +
    '<li>a: {NumberIO} coefficient a</li>' +
    '<li>b: {NumberIO} coefficient b</li>' +
    '<li>c: {NumberIO} coefficient c</li>' +
    '<li>color: {ColorIO} the color used to draw the associated curve</li>' +
    '</ul>' +
    'All coefficient values must respect the ranges for those coefficients.';

  return graphingQuadratics.register( 'Quadratic', Quadratic );
} );