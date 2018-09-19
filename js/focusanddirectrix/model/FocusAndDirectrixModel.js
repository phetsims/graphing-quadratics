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
  const Property = require( 'AXON/Property' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const P_RANGE = new RangeWithValue( -9, 9, 2 );
  const H_RANGE = new RangeWithValue( -6, 6, 0 );
  const K_RANGE = new RangeWithValue( -6, 6, 0 );
  const POINT_X = 2;

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

      // @public
      this.pointOnQuadraticProperty =
        new Property( new Vector2( POINT_X, this.quadraticProperty.value.solveY( POINT_X ) ) );

      // update the point
      this.quadraticProperty.link( ( quadratic, oldQuadratic ) => {
        //TODO handle the case of no quadratic
        if ( quadratic && oldQuadratic && quadratic.vertex && oldQuadratic.vertex ) {
          const dx = quadratic.vertex.x - oldQuadratic.vertex.x;
          const x = this.pointOnQuadraticProperty.value.x + dx;
          this.pointOnQuadraticProperty.value = new Vector2( x, quadratic.solveY( x ) );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
