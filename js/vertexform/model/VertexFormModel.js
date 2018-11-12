// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 * Vertex form of the quadratic equation is: y = a(x - h)^2 + k
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
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 ); // a coefficient
  const H_RANGE = new RangeWithValue( -9, 9, 0 ); // h coefficient
  const K_RANGE = new RangeWithValue( -9, 9, 0 ); // k coefficient

  class VertexFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      // Options for NumberProperty instances
      const numberPropertyOptions = {
        numberType: 'Integer' // Values are controlled by integer pickers
      };

      // a
      const aProperty = new NumberProperty( A_RANGE.defaultValue, _.extend( {
        range: A_RANGE,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'a' } )
      }, numberPropertyOptions ) );
      phet.log && aProperty.link( a => { phet.log( 'a=' + a ); } );

      // h
      const hProperty = new NumberProperty( H_RANGE.defaultValue, _.extend( {
        range: H_RANGE,
        tandem: tandem.createTandem( 'hProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'h' } )
      }, numberPropertyOptions ) );
      phet.log && hProperty.link( h => { phet.log( 'h=' + h ); } );

      // k
      const kProperty = new NumberProperty( K_RANGE.defaultValue, _.extend( {
        range: K_RANGE,
        tandem: tandem.createTandem( 'kProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'k' } )
      }, numberPropertyOptions ) );
      phet.log && kProperty.link( k => { phet.log( 'k=' + k ); } );

      // {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ aProperty, hProperty, kProperty ],
        ( a, h, k ) => Quadratic.createFromVertexForm( a, h, k, {
          color: GQColors.VERTEX_FORM_INTERACTIVE_CURVE
        } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the interactive quadratic, derived from a, h, and k'
        } );
      phet.log && quadraticProperty.link( quadratic => {
        phet.log( 'quadratic: y = ' + quadratic.a + ' (x - ' + quadratic.h + ')^2 + ' + quadratic.k );
      } );

      super( quadraticProperty, tandem );

      // @public
      this.aProperty = aProperty;
      this.hProperty = hProperty;
      this.kProperty = kProperty;
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.aProperty.reset();
      this.hProperty.reset();
      this.kProperty.reset();
    }
  }

  return graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
} );
