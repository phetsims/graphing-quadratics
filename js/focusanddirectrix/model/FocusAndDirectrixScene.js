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
  const H_RANGE = new RangeWithValue( -6, 6, 0 );
  const K_RANGE = new RangeWithValue( -6, 6, 0 );
  const P_RANGE = new RangeWithValue( -9, 9, 1 );

  class FocusAndDirectrixScene extends GQScene {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};

      assert && assert( !options.quadratic, 'FocusAndDirectrixScene sets quadratic' );
      options.quadratic = Quadratic.createFromStandardForm( H_RANGE.defaultValue, K_RANGE.defaultValue, P_RANGE.defaultValue, {
        color: 'black'
      } );

      super( options );

      // @public (read-only)
      this.hRange = H_RANGE;
      this.kRange = K_RANGE;
      this.pRange = P_RANGE;
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScene', FocusAndDirectrixScene );
} );
 