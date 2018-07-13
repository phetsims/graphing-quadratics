// Copyright 2018, University of Colorado Boulder

/**
 * An immutable quadratic, described by coefficients a, b, and c of x^2, x^1, and x^0, respectively.
 *
 * @author Andrea
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param a
   * @param b
   * @param c
   * @constructor
   */
  function Quadratic( a, b, c ) {

    // @public
    this.a = a;
    this.b = b;
    this.c = c;
  }

  graphingQuadratics.register( 'Quadratic', Quadratic );

  inherit( Object, Quadratic );

  // @static @public y = x (a standard line)
  Quadratic.NORMAL = new Quadratic( 1, 0, 0 );

  return Quadratic;
} );
