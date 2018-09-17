// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
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
  const H_RANGE = new RangeWithValue( -6, 6, 0 );
  const K_RANGE = new RangeWithValue( -6, 6, 0 );
  const P_RANGE = new RangeWithValue( -9, 9, 1 );

  class FocusAndDirectrixModel extends GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};

      assert && assert( !options.quadratic, 'FocusAndDirectrixModel sets quadratic' );
      options.quadratic = Quadratic.createFromAlternateVertexForm(
        P_RANGE.defaultValue, H_RANGE.defaultValue, K_RANGE.defaultValue, {
          color: 'black'
        } );

      super( options );

      // @public (read-only)
      this.hRange = H_RANGE;
      this.kRange = K_RANGE;
      this.pRange = P_RANGE;
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
