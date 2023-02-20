// Copyright 2018-2022, University of Colorado Boulder

/**
 * Displays '(x, y)' coordinates.  If the coordinates are null, this displays '(?, ?)'.
 * Performance is optimized to update only when visible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQConstants from '../GQConstants.js';

const X_MARGIN = 4;
const Y_MARGIN = 2;

type SelfOptions = {
  decimals?: number;
  foregroundColor?: TColor;
  backgroundColor?: TColor;
};

type CoordinatesNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'visibleProperty' | 'phetioDocumentation' | 'pickable'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class CoordinatesNode extends Node {

  public constructor( coordinatesProperty: Property<Vector2 | null>, providedOptions: CoordinatesNodeOptions ) {

    const options = optionize<CoordinatesNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      decimals: 0,
      foregroundColor: 'black',
      backgroundColor: 'white',

      // NodeOptions
      maxWidth: 100 // determined empirically
    }, providedOptions );

    const foregroundStringProperty = new DerivedProperty(
      [ coordinatesProperty, GraphingQuadraticsStrings.coordinateUnknownStringProperty ],
      ( coordinates, coordinateUnknownString ) => {
        const x = coordinates ? Utils.toFixedNumber( coordinates.x, options.decimals ) : coordinateUnknownString;
        const y = coordinates ? Utils.toFixedNumber( coordinates.y, options.decimals ) : coordinateUnknownString;
        return `(${x}, ${y})`;
      } );

    // the coordinates
    const foregroundNode = new Text( foregroundStringProperty, {
      font: GQConstants.COORDINATES_FONT,
      fill: options.foregroundColor
    } );

    // rectangle behind the coordinates
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      fill: options.backgroundColor,
      opacity: 0.75,
      cornerRadius: 4
    } );

    options.children = [ backgroundNode, foregroundNode ];

    super( options );

    foregroundNode.boundsProperty.link( () => {

      // resize background
      backgroundNode.setRect( 0, 0,
        foregroundNode.width + ( 2 * X_MARGIN ), foregroundNode.height + ( 2 * Y_MARGIN ) );

      // center coordinates in background
      foregroundNode.center = backgroundNode.center;
    } );
  }
}

graphingQuadratics.register( 'CoordinatesNode', CoordinatesNode );