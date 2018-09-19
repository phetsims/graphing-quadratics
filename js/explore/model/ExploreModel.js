// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const B_RANGE = new RangeWithValue( -6, 6, 0 );
  const C_RANGE = new RangeWithValue( -6, 6, 0 );

  class ExploreModel extends GQModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};

      assert && assert( !options.quadratic, 'ExploreModel sets quadratic' );
      options.quadratic = new Quadratic( A_RANGE.defaultValue, B_RANGE.defaultValue, C_RANGE.defaultValue, {
        color: GQColors.EXPLORE_INTERACTIVE_CURVE
      } );

      super( options );

      // @public (read-only)
      this.aRange = A_RANGE;
      this.bRange = B_RANGE;
      this.cRange = C_RANGE;

      // @public (read-only)
      this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getQuadraticTerm(); } );
      this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getLinearTerm(); } );
      this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getConstantTerm(); } );
    }
  }

  return graphingQuadratics.register( 'ExploreModel', ExploreModel );
} );
