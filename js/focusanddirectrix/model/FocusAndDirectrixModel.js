// Copyright 2018-2021, University of Colorado Boulder

/**
 * Model for the 'Focus & Directrix' screen.
 * Alternate vertex form of the quadratic equation is: y = (1/(4p)(x - h)^2 - k
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQModel from '../../common/model/GQModel.js';
import Quadratic from '../../common/model/Quadratic.js';
import graphingQuadratics from '../../graphingQuadratics.js';

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
    const pProperty = new NumberProperty( P_RANGE.defaultValue, merge( {
      range: P_RANGE,
      isValidValue: value => ( value !== 0 ), // zero is not supported
      tandem: tandem.createTandem( 'pProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'p' } )
    }, {
      // Opt out of providing a slider in Studio. A generic slider will cause problems, since zero is not supported.
      // See https://github.com/phetsims/graphing-quadratics/issues/52
      phetioStudioControl: false
    } ) );
    phet.log && pProperty.link( p => { phet.log( `p=${p}` ); } );

    // h
    const hProperty = new NumberProperty( H_RANGE.defaultValue, {
      range: H_RANGE,
      tandem: tandem.createTandem( 'hProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'h' } )
    } );
    phet.log && hProperty.link( h => { phet.log( `h=${h}` ); } );

    // k
    const kProperty = new NumberProperty( K_RANGE.defaultValue, {
      range: K_RANGE,
      tandem: tandem.createTandem( 'kProperty' ),
      phetioDocumentation: StringUtils.fillIn( GQConstants.VALUE_DOC, { symbol: 'k' } )
    } );
    phet.log && kProperty.link( k => { phet.log( `k=${k}` ); } );

    // {DerivedProperty.<Quadratic>}
    const quadraticProperty = new DerivedProperty(
      [ pProperty, hProperty, kProperty ],
      ( p, h, k ) => Quadratic.createFromAlternateVertexForm( p, h, k, {
        color: GQColors.FOCUS_AND_DIRECTRIX_INTERACTIVE_CURVE
      } ), {
        tandem: tandem.createTandem( 'quadraticProperty' ),
        phetioDocumentation: 'the interactive quadratic, derived from p, h, and k',
        phetioType: DerivedProperty.DerivedPropertyIO( Quadratic.QuadraticIO )
      } );
    phet.log && quadraticProperty.link( quadratic => {
      phet.log( `quadratic: y = (1/(4(${quadratic.p})))(x - ${quadratic.h})^2 + ${quadratic.k}` );
    } );

    super( quadraticProperty, tandem );

    // @public
    this.pProperty = pProperty;
    this.hProperty = hProperty;
    this.kProperty = kProperty;

    const initialPoint = new Vector2( POINT_X, this.quadraticProperty.value.solveY( POINT_X ) );

    // @public
    this.pointOnParabolaProperty = new Vector2Property( initialPoint, {
      tandem: tandem.createTandem( 'pointOnParabolaProperty' ),
      phetioDocumentation: 'the interactive point on the parabola'
    } );

    // update the point
    this.quadraticProperty.lazyLink( ( quadratic, oldQuadratic ) => {

      assert && assert( quadratic.vertex, `expected quadratic.vertex: ${quadratic.vertex}` );
      assert && assert( oldQuadratic.vertex, `expected oldQuadratic.vertex: ${oldQuadratic.vertex}` );

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

graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
export default FocusAndDirectrixModel;