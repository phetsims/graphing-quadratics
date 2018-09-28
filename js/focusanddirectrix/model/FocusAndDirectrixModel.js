// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Focus & Directrix' screen.
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
  const PropertyIO = require( 'AXON/PropertyIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // constants
  const P_RANGE = new RangeWithValue( -9, 9, 2 );
  const H_RANGE = new RangeWithValue( -6, 6, 0 );
  const K_RANGE = new RangeWithValue( -6, 6, 0 );
  const POINT_X = 5; // default x value for point on quadratic

  class FocusAndDirectrixModel extends GQModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const quadratic = Quadratic.createFromAlternateVertexForm(
        P_RANGE.defaultValue, H_RANGE.defaultValue, K_RANGE.defaultValue, {
          color: 'black'
        } );

      super( quadratic, tandem );

      // @public (read-only)
      this.pRange = P_RANGE;
      this.hRange = H_RANGE;
      this.kRange = K_RANGE;

      const initialPoint = new Vector2( POINT_X, this.quadraticProperty.value.solveY( POINT_X ) );

      // @public
      this.pointOnQuadraticProperty = new Property( initialPoint, {
        valueType: Vector2,
        tandem: tandem.createTandem( 'pointOnQuadraticProperty' ),
        phetioType: PropertyIO( Vector2IO ),
        phetioInstanceDocumentation: 'the interactive point on the quadratic'

      } );

      // update the point
      this.quadraticProperty.lazyLink( ( quadratic, oldQuadratic ) => {

        assert && assert( quadratic.vertex, 'expected quadratic.vertex: ' + quadratic.vertex );
        assert && assert( oldQuadratic.vertex, 'expected oldQuadratic.vertex: ' + oldQuadratic.vertex );

        const dx = quadratic.vertex.x - oldQuadratic.vertex.x;
        const x = this.pointOnQuadraticProperty.value.x + dx;
        this.pointOnQuadraticProperty.value = quadratic.getClosestPointInRange( x, this.graph.xRange, this.graph.yRange );
      } );
    }

    // @public
    reset() {
      super.reset();
      this.pointOnQuadraticProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
