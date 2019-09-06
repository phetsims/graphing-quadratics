// Copyright 2018-2019, University of Colorado Boulder

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
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const validate = require( 'AXON/validate' );

  class QuadraticIO extends ObjectIO {

    /**
     * Encodes the state of a Quadratic instance.
     * @param {Quadratic} quadratic
     * @returns {*}
     * @public
     * @override
     */
    static toStateObject( quadratic ) {
      validate( quadratic, this.validator );
      return quadratic.toStateObject();
    }

    /**
     * Decodes state into a Quadratic instance.
     * @param {*} object
     * @returns {Quadratic}
     * @public
     * @override
     */
    static fromStateObject( object ) {
      return Quadratic.fromStateObject( object );
    }
  }

  QuadraticIO.documentation = Quadratic.documentationQuadraticIO;
  QuadraticIO.validator = { valueType: Quadratic };
  QuadraticIO.typeName = 'QuadraticIO';
  ObjectIO.validateSubtype( QuadraticIO );

  return graphingQuadratics.register( 'QuadraticIO', QuadraticIO );
} );