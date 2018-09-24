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

  class VertexFormModel extends GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        aRange: new RangeWithValue( -6, 6, 1 ),
        hRange: new RangeWithValue( -9, 9, 0 ),
        kRange: new RangeWithValue( -9, 9, 0 )
      }, options );

      assert && assert( !options.quadratic, 'VertexFormModel sets quadratic' );
      options.quadratic = Quadratic.createFromVertexForm(
        options.aRange.defaultValue, options.hRange.defaultValue, options.kRange.defaultValue, {
        color: 'black'
      } );

      super( options );

      // @public (read-only)
      this.aRange = options.aRange;
      this.hRange = options.hRange;
      this.kRange = options.kRange;
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
