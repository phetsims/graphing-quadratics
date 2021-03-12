// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model of the point tool. Knows when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQQueryParameters from '../GQQueryParameters.js';
import Quadratic from './Quadratic.js';

class PointTool extends PhetioObject {

  /**
   * @param {Property.<Quadratic[]>} quadraticsProperty - Quadratics that the tool might intersect
   * @param {Graph} graph
   * @param {Object} [options]
   */
  constructor( quadraticsProperty, graph, options ) {

    options = merge( {
      position: Vector2.ZERO, // {Vector2} initial position
      probeSide: 'left', // {string} which side the probe is on, see GQConstants.PROBE_SIDES
      dragBounds: null, // {Bounds2|null} drag bounds, in model coordinate frame

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioState: false // this is a PhetioObject only to add phetioDocumentation
    }, options );

    assert && assert( _.includes( GQConstants.PROBE_SIDES, options.probeSide ),
      `invalid probeSide: ${options.probeSide}` );

    super( options );

    // @public (read-only)
    this.probeSide = options.probeSide;
    this.dragBounds = options.dragBounds;

    // @private
    this.quadraticsProperty = quadraticsProperty;

    // @public {Vector2}
    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'position of this point tool’s crosshairs'
    } );

    // @public {DerivedProperty.<Quadratic|null>}
    this.quadraticProperty = new DerivedProperty(
      [ this.positionProperty, quadraticsProperty ],
      ( position, quadratics ) => {
        if ( graph.contains( position ) ) {
          return this.getQuadraticNear( position,
            GQQueryParameters.pointToolThreshold, GQQueryParameters.pointToolThreshold );
        }
        else {
          return null;
        }
      }, {
        valueType: [ Quadratic, null ],
        tandem: options.tandem.createTandem( 'quadraticProperty' ),
        phetioDocumentation: 'the curve that this point tool is on, null if it is not on a curve',
        phetioType: DerivedProperty.DerivedPropertyIO( NullableIO( Quadratic.QuadraticIO ) )
      } );
  }

  /**
   * Gets the quadratic that is close to a specified position, within a specified distance.
   * This algorithm prefers to return the quadratic that the point tool is already on.
   * If that quadratic is too far away, then examine all quadratics, in foreground-to-background order.
   * See #47.
   * @param {Vector2} position - the point tool's position
   * @param {number} offDistance - if <= to this distance, snaps ON to a curve
   * @param {number} onDistance - if > this distance, snaps OFF of a curve
   * @returns {Quadratic|null} null if no quadratic is close enough
   * @public
   */
  getQuadraticNear( position, offDistance, onDistance ) {
    let onQuadratic = this.quadraticProperty && this.quadraticProperty.value;
    const quadratics = this.quadraticsProperty.value;
    if ( !onQuadratic ||
         quadratics.indexOf( onQuadratic ) === -1 ||
         !onQuadratic.hasSolution( position, offDistance ) ) {
      onQuadratic = null;
      for ( let i = 0; i < quadratics.length && !onQuadratic; i++ ) {
        const quadratic = quadratics[ i ];
        if ( quadratic.hasSolution( position, onDistance ) ) {
          onQuadratic = quadratic;
        }
      }
    }
    return onQuadratic;
  }

  // @public
  reset() {
    this.positionProperty.reset();
  }
}

graphingQuadratics.register( 'PointTool', PointTool );
export default PointTool;