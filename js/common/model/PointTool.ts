// Copyright 2018-2024, University of Colorado Boulder

/**
 * Model of the point tool. Knows when it is placed on one of the quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQQueryParameters from '../GQQueryParameters.js';
import Quadratic from './Quadratic.js';

// which side of the point tool's body the probe is on
type ProbeSide = 'left' | 'right';

type SelfOptions = {
  position?: Vector2; // initial position
  probeSide?: ProbeSide; // which side the probe is on
  dragBounds?: Bounds2; // drag bounds, in model coordinate frame
};

type PointToolOptions = SelfOptions &
  PickOptional<PhetioObjectOptions, 'phetioDocumentation'> &
  PickRequired<PhetioObjectOptions, 'tandem'>;

export default class PointTool extends PhetioObject {

  public readonly probeSide: ProbeSide;
  public readonly dragBounds: Bounds2;
  public isDragging: boolean; // true while the user is dragging the point tool
  private readonly quadraticsProperty: TReadOnlyProperty<Quadratic[]>;
  public readonly positionProperty: Property<Vector2>;
  public readonly quadraticProperty: TReadOnlyProperty<Quadratic | null>;

  /**
   * @param quadraticsProperty - Quadratics that the tool might intersect, in foreground-to-background order
   * @param graph
   * @param providedOptions
   */
  public constructor( quadraticsProperty: TReadOnlyProperty<Quadratic[]>, graph: Graph, providedOptions: PointToolOptions ) {

    const options = optionize<PointToolOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: Vector2.ZERO,
      probeSide: 'left',
      dragBounds: Bounds2.EVERYTHING,

      // PhetioObjectOptions
      phetioFeatured: true,
      phetioState: false // this is a PhetioObject only to add phetioDocumentation
    }, providedOptions );

    super( options );

    this.probeSide = options.probeSide;
    this.dragBounds = options.dragBounds;
    this.isDragging = false;
    this.quadraticsProperty = quadraticsProperty;

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'position of this point tool’s crosshairs'
    } );

    // This was originally a DerivedProperty. But an ordering dependency was discovered when restoring PhET-iO state,
    // so it was converted to a Property with phetioReadOnly: true.
    // See https://github.com/phetsims/graphing-quadratics/issues/202
    const quadraticProperty = new Property<Quadratic | null>( null, {
      valueType: [ Quadratic, null ],
      tandem: options.tandem.createTandem( 'quadraticProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'the curve that this point tool is on, null if it is not on a curve',
      phetioValueType: NullableIO( Quadratic.QuadraticIO ),
      phetioReadOnly: true
    } );
    this.quadraticProperty = quadraticProperty;

    // When we're not restoring PhET-iO state, derived the value of quadraticProperty. Otherwise, short-circuit this
    // listener, and restore the value from PhET-iO state, so that we do not have problems with the order that
    // dependencies are restored. See https://github.com/phetsims/graphing-quadratics/issues/202
    Multilink.multilink( [ this.positionProperty, quadraticsProperty ],
      ( position, quadratics ) => {
        if ( !isSettingPhetioStateProperty.value ) {
          quadraticProperty.value = ( graph.contains( position ) ) ?
                                    this.getQuadraticNear( position, GQQueryParameters.pointToolThreshold, GQQueryParameters.pointToolThreshold ) :
                                    null;
        }
      } );
  }

  /**
   * Gets the quadratic that is close to a specified position, within a specified distance. Candidates are considered
   * in foreground-to-background order, which is the order of this.quadraticsProperty.
   * While the point tool is being dragged, this algorithm prefers to return the quadratic that the point tool is
   * already on, so that it does not jump to some other (closer) quadratic.
   * See https://github.com/phetsims/graphing-quadratics/issues/47 and https://github.com/phetsims/graphing-quadratics/issues/202.
   * @param position - the point tool's position
   * @param offDistance - if <= to this distance, snaps ON to a curve
   * @param onDistance - if > this distance, snaps OFF of a curve
   * @returns null if no quadratic is close enough
   */
  public getQuadraticNear( position: Vector2, offDistance: number, onDistance: number ): Quadratic | null {
    let quadraticNear = this.isDragging ? this.quadraticProperty.value : null;
    const quadratics = this.quadraticsProperty.value;
    if ( !quadraticNear ||
         !quadratics.includes( quadraticNear ) ||
         !quadraticNear.hasSolution( position, offDistance ) ) {
      quadraticNear = null;
      for ( let i = 0; i < quadratics.length && !quadraticNear; i++ ) {
        const quadratic = quadratics[ i ];
        if ( quadratic.hasSolution( position, onDistance ) ) {
          quadraticNear = quadratic;
        }
      }
    }
    return quadraticNear;
  }

  public reset(): void {
    this.positionProperty.reset();
  }
}

graphingQuadratics.register( 'PointTool', PointTool );