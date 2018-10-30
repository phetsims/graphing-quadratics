// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Focus & Directrix' screen.
 * Alternate vertex form of the quadratic equation is: y = (1/(4p)(x - h)^1 - k
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // constants
  const P_RANGE = new RangeWithValue( -9, 9, 2 ); // p coefficient
  const H_RANGE = new RangeWithValue( -6, 6, 0 ); // h coefficient
  const K_RANGE = new RangeWithValue( -6, 6, 0 ); // k coefficient
  const POINT_X = 5; // default x value for point on parabola

  class FocusAndDirectrixModel extends GQModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // coefficients for alternate vertex form
      const pProperty = new NumberProperty( P_RANGE.defaultValue, {
        range: P_RANGE,
        tandem: tandem.createTandem( 'pProperty' ),
        phetioDocumentation: 'coefficient a for the interactive quadratic'
      } );
      phet.log && pProperty.link( p => { phet.log( 'p=' + p ); } );

      const hProperty = new NumberProperty( H_RANGE.defaultValue, {
        range: H_RANGE,
        tandem: tandem.createTandem( 'hProperty' ),
        phetioDocumentation: 'coefficient h for the interactive quadratic'
      } );
      phet.log && hProperty.link( h => { phet.log( 'h=' + h ); } );

      const kProperty = new NumberProperty( K_RANGE.defaultValue, {
        range: K_RANGE,
        tandem: tandem.createTandem( 'kProperty' ),
        phetioDocumentation: 'coefficient k for the interactive quadratic'
      } );
      phet.log && kProperty.link( k => { phet.log( 'k=' + k ); } );

      // {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ pProperty, hProperty, kProperty ],
        ( p, h, k ) => Quadratic.createFromAlternateVertexForm( p, h, k, {
          color: GQColors.FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE
        } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the interactive quadratic, derived from p, h, and k'
        } );
      phet.log && quadraticProperty.link( quadratic => {
        phet.log( 'quadratic: y = (1/(4(' + quadratic.p + ')))(x - ' + quadratic.h + ')^2 + ' + quadratic.k );
      } );

      super( quadraticProperty, tandem );

      // @public
      this.pProperty = pProperty;
      this.hProperty = hProperty;
      this.kProperty = kProperty;

      const initialPoint = new Vector2( POINT_X, this.quadraticProperty.value.solveY( POINT_X ) );

      // @public {Property.<Vector>}
      this.pointOnParabolaProperty = new Property( initialPoint, {
        valueType: Vector2,
        tandem: tandem.createTandem( 'pointOnParabolaProperty' ),
        phetioType: PropertyIO( Vector2IO ),
        phetioDocumentation: 'the interactive point on the parabola'
      } );

      // update the point
      this.quadraticProperty.lazyLink( ( quadratic, oldQuadratic ) => {

        assert && assert( quadratic.vertex, 'expected quadratic.vertex: ' + quadratic.vertex );
        assert && assert( oldQuadratic.vertex, 'expected oldQuadratic.vertex: ' + oldQuadratic.vertex );

        const dx = quadratic.vertex.x - oldQuadratic.vertex.x;
        const x = this.pointOnParabolaProperty.value.x + dx;
        this.pointOnParabolaProperty.value = quadratic.getClosestPointInRange( x, this.graph.xRange, this.graph.yRange );
      } );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.pProperty.reset();
      this.hProperty.reset();
      this.kProperty.reset();
      this.pointOnParabolaProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
