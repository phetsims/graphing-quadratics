// Copyright 2018, University of Colorado Boulder

/**
 * A scene in the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const GQScene = require( 'GRAPHING_QUADRATICS/common/model/GQScene' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const B_RANGE = new RangeWithValue( -6, 6, 0 );
  const C_RANGE = new RangeWithValue( -6, 6, 0 );

  class FocusAndDirectrixScene extends GQScene {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};

      assert && assert( !options.quadratic, 'FocusAndDirectrixScene sets quadratic' );
      options.quadratic = new Quadratic( A_RANGE.defaultValue, B_RANGE.defaultValue, C_RANGE.defaultValue, {
        color: 'black'
      } );

      super( options );

      // @public (read-only)
      this.aRange = A_RANGE;
      this.bRange = B_RANGE;
      this.cRange = C_RANGE;
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScene', FocusAndDirectrixScene );
} );
 