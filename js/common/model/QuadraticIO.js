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
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const phetioInherit = require( 'TANDEM/phetioInherit' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const validate = require( 'AXON/validate' );

  /**
   * @param {Quadratic} quadratic
   * @param {string} phetioID
   * @constructor
   */
  function QuadraticIO( quadratic, phetioID ) {
    ObjectIO.call( this, quadratic, phetioID );
  }

  graphingQuadratics.register( 'QuadraticIO', QuadraticIO );

  return phetioInherit( ObjectIO, 'QuadraticIO', QuadraticIO, {}, {

    // @public This appears in PhET-iO Studio
    documentation: Quadratic.documentationQuadraticIO,

    validator: { valueType: Quadratic },

    /**
     * Encodes the state of a Quadratic instance.
     * @param {Quadratic} quadratic
     * @returns {*}
     * @public
     * @override
     */
    toStateObject: function( quadratic ) {
      validate( quadratic, this.validator );
      return quadratic.toStateObject();
    },

    /**
     * Decodes state into a Quadratic instance.
     * @param {*} object
     * @returns {Quadratic}
     * @public
     * @override
     */
    fromStateObject: function( object ) {
      return Quadratic.fromStateObject( object );
    }
  } );
} );