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
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  // constants
  const A_RANGE = new RangeWithValue( -6, 6, 1 ); // a coefficient
  const H_RANGE = new RangeWithValue( -9, 9, 0 ); // h coefficient
  const K_RANGE = new RangeWithValue( -9, 9, 0 ); // k coefficient
  const COEFFICIENT_NUMBER_TYPE = 'Integer';

  class VertexFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      // Options used in all of the coefficient Properties
      const coefficientPropertyOptions = {
        numberType: COEFFICIENT_NUMBER_TYPE,

        // This NumberProperty can be controlled directly in the simulation, hence we do not require a redundant
        // slider in Studio, see https://github.com/phetsims/graphing-quadratics/issues/52
        phetioStudioControl: false
      };

      // coefficients for vertex form
      const aProperty = new NumberProperty( A_RANGE.defaultValue, _.extend( {
        range: A_RANGE,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioDocumentation: 'coefficient a for the interactive quadratic'
      }, coefficientPropertyOptions ) );
      phet.log && aProperty.link( a => { phet.log( 'a=' + a ); } );

      const hProperty = new NumberProperty( H_RANGE.defaultValue, _.extend( {
        range: H_RANGE,
        tandem: tandem.createTandem( 'hProperty' ),
        phetioDocumentation: 'coefficient h for the interactive quadratic'
      }, coefficientPropertyOptions ) );
      phet.log && hProperty.link( h => { phet.log( 'h=' + h ); } );

      const kProperty = new NumberProperty( K_RANGE.defaultValue, _.extend( {
        range: K_RANGE,
        tandem: tandem.createTandem( 'kProperty' ),
        phetioDocumentation: 'coefficient k for the interactive quadratic'
      }, coefficientPropertyOptions ) );
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
