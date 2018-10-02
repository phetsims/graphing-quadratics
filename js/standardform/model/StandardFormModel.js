// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
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
  const A_RANGE = new RangeWithValue( -6, 6, 1 );
  const B_RANGE = new RangeWithValue( -6, 6, 0 );
  const C_RANGE = new RangeWithValue( -6, 6, 0 );

  class StandardFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // coefficients for standard form: y = ax^2 + bx + c
      const aProperty = new NumberProperty( A_RANGE.defaultValue, {
        range: A_RANGE,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioInstanceDocumentation: 'coefficient a for the interactive quadratic'
      } );
      const bProperty = new NumberProperty( B_RANGE.defaultValue, {
        range: B_RANGE,
        tandem: tandem.createTandem( 'bProperty' ),
        phetioInstanceDocumentation: 'coefficient b for the interactive quadratic'
      } );
      const cProperty = new NumberProperty( C_RANGE.defaultValue, {
        range: C_RANGE,
        tandem: tandem.createTandem( 'cProperty' ),
        phetioInstanceDocumentation: 'coefficient c for the interactive quadratic'
      } );

      // @public {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ aProperty, bProperty, cProperty ],
        ( a, b, c ) => new Quadratic( a, b, c, { color: GQColors.EXPLORE_INTERACTIVE_CURVE } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the interactive quadratic, derived from a, b, and c'
        } );
      quadraticProperty.link( quadratic => {
        phet.log && phet.log( 'quadratic = ' + quadratic.a + ' x^2 + ' + quadratic.b + ' x + ' + quadratic.c );
      } );

      super( quadraticProperty, tandem );

      // @public
      this.quadraticProperty = quadraticProperty;
      this.aProperty = aProperty;
      this.bProperty = bProperty;
      this.cProperty = cProperty;
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.aProperty.reset();
      this.bProperty.reset();
      this.cProperty.reset();
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
