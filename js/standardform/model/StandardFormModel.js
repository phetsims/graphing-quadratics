// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 * Standard form of the quadratic equation is: y = ax^2 + bx + c
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
  const B_RANGE = new RangeWithValue( -6, 6, 0 ); // b coefficient
  const C_RANGE = new RangeWithValue( -6, 6, 0 ); // c constant

  class StandardFormModel extends GQModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {

      options = _.extend( {

        // NumberProperty options
        numberType: 'Integer'
      }, options );

      // Options for NumberProperty instances
      const numberPropertyOptions = {
        numberType: options.numberType,

        // Can be controlled directly in the simulation, hence we do not require a redundant
        // slider in Studio, see https://github.com/phetsims/graphing-quadratics/issues/52
        phetioStudioControl: false
      };

      // a
      const aProperty = new NumberProperty( A_RANGE.defaultValue, _.extend( {
        range: A_RANGE,
        tandem: tandem.createTandem( 'aProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'a' } )
      }, numberPropertyOptions ) );
      phet.log && aProperty.link( a => { phet.log( 'a=' + a ); } );

      // b
      const bProperty = new NumberProperty( B_RANGE.defaultValue, _.extend( {
        range: B_RANGE,
        tandem: tandem.createTandem( 'bProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'p' } )
      }, numberPropertyOptions ) );
      phet.log && bProperty.link( b => { phet.log( 'b=' + b ); } );

      // c
      const cProperty = new NumberProperty( C_RANGE.defaultValue, _.extend( {
        range: C_RANGE,
        tandem: tandem.createTandem( 'cProperty' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.PHET_IO_DOCUMENTATION_PATTERN, { symbol: 'p' } )
      }, numberPropertyOptions ) );
      phet.log && cProperty.link( c => { phet.log( 'c=' + c ); } );

      // {DerivedProperty.<Quadratic>}
      const quadraticProperty = new DerivedProperty(
        [ aProperty, bProperty, cProperty ],
        ( a, b, c ) => new Quadratic( a, b, c, { color: GQColors.EXPLORE_INTERACTIVE_CURVE } ), {
          tandem: tandem.createTandem( 'quadraticProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the interactive quadratic, derived from a, b, and c'
        } );
      phet.log && quadraticProperty.link( quadratic => {
        phet.log( 'quadratic: y = ' + quadratic.a + ' x^2 + ' + quadratic.b + ' x + ' + quadratic.c );
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
