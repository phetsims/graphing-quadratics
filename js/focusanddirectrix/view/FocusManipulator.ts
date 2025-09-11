// Copyright 2018-2025, University of Colorado Boulder

/**
 * FocusManipulator is the manipulator for editing a quadratic (parabola) by changing its focus.
 * It displays the coordinates of the focus.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import Quadratic from '../../common/model/Quadratic.js';
import GQManipulator, { GQManipulatorOptions } from '../../common/view/GQManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import { FocusRichDragListener } from './FocusRichDragListener.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import GQGraph from '../../common/model/GQGraph.js';

// constants
const COORDINATES_Y_SPACING = 1;

type SelfOptions = EmptySelfOptions;

type FocusManipulatorOptions = SelfOptions & PickRequired<GQManipulatorOptions, 'tandem' | 'phetioDocumentation'>;

export default class FocusManipulator extends GQManipulator {

  private readonly quadraticProperty: TReadOnlyProperty<Quadratic>;

  public constructor( pProperty: NumberProperty,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      graph: GQGraph,
                      modelViewTransform: ModelViewTransform2,
                      focusVisibleProperty: TReadOnlyProperty<boolean>,
                      coordinatesVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: FocusManipulatorOptions ) {

    const options = optionize4<FocusManipulatorOptions, SelfOptions, GQManipulatorOptions>()(
      {}, AccessibleDraggableOptions, {

        // GQManipulatorOptions
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        color: GQColors.focusColorProperty,
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.focusColorProperty,
        coordinatesDecimals: GQConstants.FOCUS_DECIMALS,
        accessibleName: GraphingQuadraticsStrings.a11y.focusManipulator.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.focusManipulator.accessibleHelpTextStringProperty
      }, providedOptions );

    // position coordinates based on which way the parabola opens
    affirm( !options.layoutCoordinates, 'FocusManipulator sets layoutCoordinates' );
    options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
      affirm( coordinates, 'expected coordinates' );
      coordinatesNode.centerX = 0;
      const yOffset = radius + COORDINATES_Y_SPACING;
      if ( quadraticProperty.value.a > 0 ) {
        coordinatesNode.bottom = -yOffset;
      }
      else {
        coordinatesNode.top = yOffset;
      }
    };

    // coordinates correspond to the quadratic's focus
    const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
      quadratic => quadratic.focus || null, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioValueType: Vector2.Vector2IO,
        phetioDocumentation: 'coordinates displayed on the focus manipulator'
      } );

    // visibility of this Node
    affirm( !options.visibleProperty, 'FocusManipulator sets visibleProperty' );
    options.visibleProperty = new DerivedProperty(
      [ focusVisibleProperty, quadraticProperty ],
      ( focusVisible, quadratic ) =>
        focusVisible && // the Focus checkbox is checked
        ( quadratic.focus !== undefined ) && // the quadratic has a focus
        graph.contains( quadratic.focus ), // the focus is on the graph
      {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    this.quadraticProperty = quadraticProperty;

    this.addInputListener( new FocusRichDragListener( this, pProperty, quadraticProperty, graph.yRange,
      modelViewTransform, options.tandem ) );

    // move the manipulator
    quadraticProperty.link( quadratic => {
      const focus = quadratic.focus!;
      affirm( focus, `expected focus: ${quadratic.focus}` );
      this.translation = modelViewTransform.modelToViewPosition( focus );
    } );

    // When this manipulator gets focus, describe it.
    this.focusedProperty.lazyLink( focused => {
      focused && this.doAccessibleObjectResponse();
    } );
  }

  /**
   * Adds an accessible object response that describes the focus of the quadratic.
   */
  public doAccessibleObjectResponse(): void {
    const focus = this.quadraticProperty.value.focus;
    if ( focus ) {
      const response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.focusManipulator.accessibleObjectResponseStringProperty, {

        // Use the same formatting and number of decimal places as the visual UI.
        x: toFixedNumber( focus.x, GQConstants.FOCUS_DECIMALS ),
        y: toFixedNumber( focus.y, GQConstants.FOCUS_DECIMALS )
      } );
      this.addAccessibleObjectResponse( response );
    }
  }
}

graphingQuadratics.register( 'FocusManipulator', FocusManipulator );