// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const H_RANGE = new RangeWithValue( -9, 9, 0 );
  const K_RANGE = new RangeWithValue( -9, 9, 0 );

  class VertexFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const quadratic = Quadratic.createFromVertexForm(
        A_RANGE.defaultValue, H_RANGE.defaultValue, K_RANGE.defaultValue, {
          color: 'black'
        } );

      super( quadratic, tandem );

      // @public (read-only)
      this.aRange = A_RANGE;
      this.hRange = H_RANGE;
      this.kRange = K_RANGE;
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
