// Copyright 2018, University of Colorado Boulder

/**
 * IO type for Quadratic
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );

  // ifphetio
  const assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  const ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  const phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {Quadratic} quadratic
   * @param {string} phetioID
   * @constructor
   */
  function QuadraticIO( quadratic, phetioID ) {
    assert && assertInstanceOf( quadratic, Quadratic );
    ObjectIO.call( this, quadratic, phetioID );
  }

  graphingQuadratics.register( 'QuadraticIO', QuadraticIO );

  //TODO return fails here, see https://github.com/phetsims/phet-io/issues/1370
  phetioInherit( ObjectIO, 'QuadraticIO', QuadraticIO, {}, {

    /**
     * Encodes the state of a Quadratic instance.
     * @param {Quadratic} quadratic
     * @returns {*}
     */
    toStateObject: function( quadratic ) {
      assert && assertInstanceOf( quadratic, Quadratic );
      return {
        a: quadratic.a,
        b: quadratic.b,
        c: quadratic.c,
        color: quadratic.color
      };
    },

    /**
     * @param {*} object
     * @returns {Quadratic}
     */
    fromStateObject: function( object ) {
      return new Quadratic( object.a, object.b, object.c, {
        color: object.color
      } );
    }
  } );

  return QuadraticIO;
} );