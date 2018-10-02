// Copyright 2018, University of Colorado Boulder

//TODO lots of duplication here with VertexFormModel
/**
 * Model for the 'Focus & Directrix' screen.
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
  const POINT_X = 5; // default x value for point on quadratic

  class FocusAndDirectrixModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      options = _.extend( {
        pRange: new RangeWithValue( -9, 9, 2 ),
        hRange: new RangeWithValue( -6, 6, 0 ),
        kRange: new RangeWithValue( -6, 6, 0 )
      }, options );

      // coefficients for y = (1/(4p)(x - h)^1 - k
      const pProperty = new NumberProperty( options.pRange.defaultValue, {
        range: options.pRange,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioInstanceDocumentation: 'coefficient a for the interactive quadratic'
      } );
      const hProperty = new NumberProperty( options.hRange.defaultValue, {
        range: options.hRange,
        tandem: tandem.createTandem( 'bProperty' ),
        phetioInstanceDocumentation: 'coefficient h for the interactive quadratic'
      } );
      const kProperty = new NumberProperty( options.kRange.defaultValue, {
        range: options.kRange,
        tandem: tandem.createTandem( 'cProperty' ),
        phetioInstanceDocumentation: 'coefficient k for the interactive quadratic'
      } );

      // @public {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ pProperty, hProperty, kProperty ],
        ( p, h, k ) => Quadratic.createFromAlternateVertexForm( p, h, k, {
          color: GQColors.FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE
        } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the interactive quadratic'
        } );

      super( quadraticProperty, tandem );

      // @public
      this.pProperty = pProperty;
      this.hProperty = hProperty;
      this.kProperty = kProperty;

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
      this.pProperty.reset();
      this.hProperty.reset();
      this.kProperty.reset();
      this.pointOnQuadraticProperty.reset();
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
