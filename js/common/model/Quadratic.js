// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by coefficients a, b, and c of x^2, x^1, and x^0, respectively.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const NotALine = require( 'GRAPHING_LINES/linegame/model/NotALine' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  class Quadratic {

    /**
     *
     * @param {number} a
     * @param {number} b
     * @param {number} c
     */
    constructor( a, b, c ) {

      // @public
      this.a = a;
      this.b = b;
      this.c = c;

      // calculate more information about the quadratic
      // see http://jwilson.coe.uga.edu/emt668/emat6680.folders/brooks/assignments/Assign2/Coeffpar.html

      if ( a !== 0 ) { // is a quadratic

        // turn ax^2 + bx + c into 4p(y-k)=(x-h)^2
        const h = -b / ( 2 * a );
        const k = c - b * b / ( 4 * a );
        const p = 1 / ( 4 * a );

        // @public
        this.vertex = new Vector2( h, k );
        this.axisOfSymmetry = new Line( h, 0, h, 1, 'purple' ); // x = h;
        this.focus = new Vector2( h, k + p );
        this.directrix = new Line( 0, k - p, 1, k - p, 'green' ); // y = k - p
        this.roots = Util.solveQuadraticRootsReal( a, b, c )
          .map( root => new Vector2( root, 0 ) );
      }
      else { // not a quadratic
        this.axisOfSymmetry = NotALine();
        this.directrix = NotALine();
      }
    }

    /**
     * Get a copy of this quadratic
     *
     * @returns {Quadratic}
     * @public
     */
    getCopy() {
      return new Quadratic( this.a, this.b, this.c );
    }

    /**
     * Tests whether this quadratic is equal to the given
     * @param quadratic
     * @returns {boolean}
     *
     * @public
     */
    equals( quadratic ) {
      return this.a === quadratic.a && this.b === quadratic.b && this.c === quadratic.c;
    }

    /**
     * Get a quadratic of just the ax^2 term
     *
     * @returns {Quadratic}
     * @public
     */
    getQuadraticTerm() {
      return new Quadratic( this.a, 0, 0 ); // y = ax^2
    }

    /**
     * Get a quadratic of just the bx term
     *
     * @returns {Line}
     * @public
     */
    getLinearTerm() {
      return new Line( 0, 0, 1, this.b, 'green' ); // y = bx
    }

    /**
     * Get a quadratic of just c term
     *
     * @returns {Line}
     * @public
     */
    getConstantTerm() {
      return new Line( 0, this.c, 1, this.c ); // y = c
    }

    /**
     * Create a quadratic given a, h, and k from y = a(x - h)^2 + k
     * @param {number} a
     * @param {number} h
     * @param {number} k
     * @returns {Quadratic}
     *
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