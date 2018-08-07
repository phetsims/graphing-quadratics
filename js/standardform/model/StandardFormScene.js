// Copyright 2018, University of Colorado Boulder

/**
 * A scene in the 'Standard Form' screen.
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
  const B_RANGE = new RangeWithValue( -6, 6, 0 );
  const C_RANGE = new RangeWithValue( -6, 6, 0 );

  class StandardFormScene extends GQScene {

    /**
     * @param {Node} icon - scenes in the 'Standard Form' screen require an icon
     * @param {Object} [options]
     */
    constructor( icon, options ) {

      options = options || {};

      assert && assert( !options.icon, 'StandardFormScene sets icon' );
      options.icon = icon;

      assert && assert( !options.quadratic, 'StandardFormScene sets quadratic' );
      options.quadratic = new Quadratic( A_RANGE.defaultValue, B_RANGE.defaultValue, C_RANGE.defaultValue );

      super( options );

      // @public (read-only)
      this.aRange = A_RANGE;
      this.bRange = B_RANGE;
      this.cRange = C_RANGE;
    }
  }

  return graphingQuadratics.register( 'StandardFormScene', StandardFormScene );
} );
 