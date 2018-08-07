// Copyright 2018, University of Colorado Boulder

/**
 * A scene in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const H_RANGE = new RangeWithValue( -10, 10, 0 );
  const K_RANGE = new RangeWithValue( -10, 10, 0 );

  class VertexFormScene extends GQScene {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};

      assert && assert( !options.quadratic, 'VertexFormScene sets quadratic' );
      options.quadratic = new Quadratic( A_RANGE.defaultValue, 0, 0 );

      super( options );

      // @public (read-only)
      this.aRange = A_RANGE;
      this.hRange = H_RANGE;
      this.kRange = K_RANGE;
    }
  }

  return graphingQuadratics.register( 'VertexFormScene', VertexFormScene );
} );
 