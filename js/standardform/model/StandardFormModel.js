// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 * Standard form of the quadratic equation is: y = ax^2 + bx + c
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../../axon/js/DerivedPropertyIO.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQModel from '../../common/model/GQModel.js';
import Quadratic from '../../common/model/Quadratic.js';
import QuadraticIO from '../../common/model/QuadraticIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';

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

    options = merge( {

      // NumberProperty options
      numberType: 'Integer'
    }, options );

    // Options for all NumberProperty instances
    const numberPropertyOptions = {
      numberType: options.numberType
    };

    // a
    const aProperty = new NumberProperty( A_RANGE.defaultValue, merge( {
      range: A_RANGE,
      tandem: tandem.createTandem( 'aProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'a' } )
    }, numberPropertyOptions ) );
    phet.log && aProperty.link( a => { phet.log( 'a=' + a ); } );

    // b
    const bProperty = new NumberProperty( B_RANGE.defaultValue, merge( {
      range: B_RANGE,
      tandem: tandem.createTandem( 'bProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'b' } )
    }, numberPropertyOptions ) );
    phet.log && bProperty.link( b => { phet.log( 'b=' + b ); } );

    // c
    const cProperty = new NumberProperty( C_RANGE.defaultValue, merge( {
      range: C_RANGE,
      tandem: tandem.createTandem( 'cProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'c' } )
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

graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
export default StandardFormModel;