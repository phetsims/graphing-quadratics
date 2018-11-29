// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Focus & Directrix' screen.
 * Alternate vertex form of the quadratic equation is: y = (1/(4p)(x - h)^2 - k
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
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

      // p
      const pProperty = new NumberProperty( P_RANGE.defaultValue, _.extend( {
        range: P_RANGE,
        isValidValue: value => ( value !== 0 ), // zero is not supported
        tandem: tandem.createTandem( 'pProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'p' } ),
        phetioFeatured: true
      }, {
        // Opt out of providing a slider in Studio. A generic slider will cause problems, since zero is not supported.
        // See https://github.com/phetsims/graphing-quadratics/issues/52
        phetioStudioControl: false
      } ) );
      phet.log && pProperty.link( p => { phet.log( 'p=' + p ); } );

      // h
      const hProperty = new NumberProperty( H_RANGE.defaultValue, _.extend( {
        range: H_RANGE,
        tandem: tandem.createTandem( 'hProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'h' } ),
        phetioFeatured: true
      } ) );
      phet.log && hProperty.link( h => { phet.log( 'h=' + h ); } );

      // k
      const kProperty = new NumberProperty( K_RANGE.defaultValue, _.extend( {
        range: K_RANGE,
        tandem: tandem.createTandem( 'kProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'k' } ),
        phetioFeatured: true
      } ) );
      phet.log && kProperty.link( k => { phet.log( 'k=' + k ); } );

      // {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ pProperty, hProperty, kProperty ],
        ( p, h, k ) => Quadratic.createFromAlternateVertexForm( p, h, k, {
          color: GQColors.FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE
        } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioDocumentation: 'the interactive quadratic, derived from p, h, and k',
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioFeatured: true
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
        phetioDocumentation: 'the interactive point on the parabola',
        phetioType: PropertyIO( Vector2IO )
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
