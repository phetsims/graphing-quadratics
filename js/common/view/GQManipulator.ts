// Copyright 2018-2024, University of Colorado Boulder

/**
 * An extension of Manipulator that adds a display of the manipulator's (x,y) coordinates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Manipulator, { ManipulatorOptions } from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import CoordinatesNode from './CoordinatesNode.js';

// Positions the coordinates relative to the sphere
type LayoutCoordinatesFunction = ( coordinates: Vector2 | null, coordinatesNode: Node, radius: number ) => void;

const DEFAULT_LAYOUT_COORDINATES: LayoutCoordinatesFunction = ( coordinates, coordinatesNode, radius ) => {
  // centered above the manipulator
  coordinatesNode.centerX = 0;
  coordinatesNode.bottom = -( radius + 1 );
};

type SelfOptions = {

  // arguments to Manipulator constructor
  radius?: number;
  color?: TColor;

  // options passed to CoordinatesNode
  coordinatesBackgroundColor?: TColor;
  coordinatesForegroundColor?: TColor;
  coordinatesDecimals?: number;

  // Positions the coordinates relative to the sphere
  layoutCoordinates?: LayoutCoordinatesFunction;
};

export type GQManipulatorOptions = SelfOptions & ManipulatorOptions & PickRequired<ManipulatorOptions, 'tandem'>;

export default class GQManipulator extends Manipulator {

  protected constructor( coordinatesProperty: TReadOnlyProperty<Vector2 | null>,
                         coordinatesVisibleProperty: TReadOnlyProperty<boolean>,
                         providedOptions: GQManipulatorOptions ) {

    const options = optionize<GQManipulatorOptions, SelfOptions, ManipulatorOptions>()( {

      // SelfOptions
      isDisposable: false,
      radius: 10,
      color: 'black',
      coordinatesBackgroundColor: 'black',
      coordinatesForegroundColor: 'white',
      coordinatesDecimals: 0,
      layoutCoordinates: DEFAULT_LAYOUT_COORDINATES,

      // ManipulatorOptions
      haloAlpha: 0.15,
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions );

    super( options.radius, options.color, options );

    // Determine the actual radius of the manipulator (sphere + optional halo) before adding coordinates.
    // This will be used to lay out the coordinates relative to the sphere + halo.
    const actualRadius = this.width / 2;

    // Coordinates display
    const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
      backgroundColor: options.coordinatesBackgroundColor,
      foregroundColor: options.coordinatesForegroundColor,
      decimals: options.coordinatesDecimals,
      visibleProperty: coordinatesVisibleProperty,
      tandem: options.tandem.createTandem( 'coordinatesNode' ),
      phetioDocumentation: 'coordinates displayed on this manipulator'
    } );
    this.addChild( coordinatesNode );

    // Update layout
    Multilink.multilink( [ coordinatesProperty, coordinatesNode.boundsProperty ],
      ( coordinates, bounds ) => options.layoutCoordinates( coordinates, coordinatesNode, actualRadius ) );
  }
}

graphingQuadratics.register( 'GQManipulator', GQManipulator );