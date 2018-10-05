// Copyright 2018, University of Colorado Boulder

//TODO https://github.com/phetsims/phet-io/issues/1371, convert to ES6 class when phetioInherit supports it
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

  return phetioInherit( ObjectIO, 'QuadraticIO', QuadraticIO, {}, {

    // This appears in PhET-iO Studio
    documentation: Quadratic.documentationQuadraticIO,

    /**
     * Encodes the state of a Quadratic instance.
     * @param {Quadratic} quadratic
     * @returns {*}
     * @public
     */
    toStateObject: function( quadratic ) {
      assert && assertInstanceOf( quadratic, Quadratic );
      return quadratic.toStateObject();
    },

    /**
     * Decodes state into a Quadratic instance.
     * @param {*} object
     * @returns {Quadratic}
     * @public
     */
    fromStateObject: function( object ) {
      return Quadratic.fromStateObject( object );
    }
  } );
} );