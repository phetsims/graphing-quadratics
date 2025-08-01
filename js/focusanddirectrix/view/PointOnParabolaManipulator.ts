// Copyright 2018-2025, University of Colorado Boulder

/**
 * PointOnParabolaManipulator is the manipulator for editing a point on a parabola.
 * It displays the coordinates of the point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import Quadratic from '../../common/model/Quadratic.js';
import GQManipulator, { GQManipulatorOptions } from '../../common/view/GQManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { PointOnParabolaRichDragListener } from './PointOnParabolaRichDragListener.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

// constants
const COORDINATES_X_SPACING = 1;

type SelfOptions = EmptySelfOptions;

type PointOnParabolaManipulatorOptions = SelfOptions &
  PickRequired<GQManipulatorOptions, 'visibleProperty' | 'tandem' | 'phetioDocumentation'>;

export default class PointOnParabolaManipulator extends GQManipulator {

  private readonly pointOnParabolaProperty: Property<Vector2>;

  public constructor( pointOnParabolaProperty: Property<Vector2>,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      graph: Graph,
                      modelViewTransform: ModelViewTransform2,
                      coordinatesVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: PointOnParabolaManipulatorOptions ) {

    const options = optionize4<PointOnParabolaManipulatorOptions, SelfOptions, GQManipulatorOptions>()(
      {}, AccessibleDraggableOptions, {

        // GQManipulatorOptions
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        color: GQColors.pointOnParabolaColorProperty,
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.pointOnParabolaColorProperty,
        coordinatesDecimals: GQConstants.POINT_ON_PARABOLA_DECIMALS,
        accessibleName: GraphingQuadraticsStrings.a11y.pointOnParabolaManipulator.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.pointOnParabolaManipulator.accessibleHelpTextStringProperty,
        phetioDocumentation: 'manipulator for a point on the parabola'
      }, providedOptions );

    // position coordinates based on which side of the parabola the point is on
    assert && assert( !options.layoutCoordinates, 'PointOnParabolaManipulator sets layoutCoordinates' );
    options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
      assert && assert( coordinates, 'expected coordinates' );
      const vertex = quadraticProperty.value.vertex!;
      assert && assert( vertex, 'expected a parabola' );
      const xOffset = radius + COORDINATES_X_SPACING;
      if ( coordinates!.x >= vertex.x ) {
        coordinatesNode.left = xOffset;
      }
      else {
        coordinatesNode.right = -xOffset;
      }
      coordinatesNode.centerY = 0;
    };

    // Coordinates are identical to pointOnParabolaProperty. We're using a separate Property here
    // for PhET-iO instrumentation symmetry with other manipulators.
    const coordinatesProperty = new DerivedProperty( [ pointOnParabolaProperty ],
      pointOnParabola => pointOnParabola, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioDocumentation: 'coordinates displayed on the point-on-quadratic manipulator',
        phetioValueType: Vector2.Vector2IO
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    this.pointOnParabolaProperty = pointOnParabolaProperty;

    // add drag handler
    this.addInputListener( new PointOnParabolaRichDragListener( this, pointOnParabolaProperty, quadraticProperty,
      modelViewTransform, graph, options.tandem ) );

    // move the manipulator
    pointOnParabolaProperty.link( pointOnParabola => {
      this.translation = modelViewTransform.modelToViewPosition( pointOnParabola );
    } );

    this.focusedProperty.lazyLink( focused => {
      focused && this.doAccessibleObjectResponse();
    } );
  }

  /**
   * Adds an accessible object response that describes the point on the parabola.
   */
  public doAccessibleObjectResponse(): void {
    const pointOnParabola = this.pointOnParabolaProperty.value;
    const response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.pointOnParabolaManipulator.accessibleObjectResponseStringProperty, {

      // Use the same formatting and number of decimal places as the visual UI.
      x: toFixedNumber( pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS ),
      y: toFixedNumber( pointOnParabola.y, GQConstants.POINT_ON_PARABOLA_DECIMALS )
    } );
    this.addAccessibleObjectResponse( response );
  }
}

graphingQuadratics.register( 'PointOnParabolaManipulator', PointOnParabolaManipulator );