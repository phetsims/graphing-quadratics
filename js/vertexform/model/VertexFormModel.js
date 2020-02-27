// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for the 'Vertex Form' screen.
 * Vertex form of the quadratic equation is: y = a(x - h)^2 + k
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
    const aProperty = new NumberProperty( A_RANGE.defaultValue, merge( {
      range: A_RANGE,
      tandem: tandem.createTandem( 'aProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'a' } )
    }, numberPropertyOptions ) );
    phet.log && aProperty.link( a => { phet.log( 'a=' + a ); } );

    // h
    const hProperty = new NumberProperty( H_RANGE.defaultValue, merge( {
      range: H_RANGE,
      tandem: tandem.createTandem( 'hProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'h' } )
    }, numberPropertyOptions ) );
    phet.log && hProperty.link( h => { phet.log( 'h=' + h ); } );

    // k
    const kProperty = new NumberProperty( K_RANGE.defaultValue, merge( {
      range: K_RANGE,
      tandem: tandem.createTandem( 'kProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'k' } )
    }, numberPropertyOptions ) );
    phet.log && kProperty.link( k => { phet.log( 'k=' + k ); } );

    // {DerivedProperty.<Quadratic>}
    const quadraticProperty = new DerivedProperty(
      [ aProperty, hProperty, kProperty ],
      ( a, h, k ) => Quadratic.createFromVertexForm( a, h, k, {
        color: GQColors.VERTEX_FORM_INTERACTIVE_CURVE
      } ), {
        tandem: tandem.createTandem( 'quadraticProperty' ),
        phetioDocumentation: 'the interactive quadratic, derived from a, h, and k',
        phetioType: DerivedPropertyIO( QuadraticIO )
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

graphingQuadratics.register( 'VertexFormModel', VertexFormModel );
export default VertexFormModel;