// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  class StandardFormModel extends GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        aRange: new RangeWithValue( -6, 6, 1 ),
        bRange: new RangeWithValue( -6, 6, 0 ),
        cRange: new RangeWithValue( -6, 6, 0 )
      }, options );

      assert && assert( !options.quadratic, 'StandardFormModel sets quadratic' );
      options.quadratic = new Quadratic(
        options.aRange.defaultValue, options.bRange.defaultValue, options.cRange.defaultValue, {
          color: GQColors.EXPLORE_INTERACTIVE_CURVE
        } );

      super( options );

      // @public (read-only)
      this.aRange = options.aRange;
      this.bRange = options.bRange;
      this.cRange = options.cRange;
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
