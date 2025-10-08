// Copyright 2018-2025, University of Colorado Boulder

/**
 * VertexManipulator is the manipulator for editing a quadratic (parabola) by changing its vertex.
 * It displays the coordinates of the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import Quadratic from '../model/Quadratic.js';
import GQManipulator, { GQManipulatorOptions } from './GQManipulator.js';
import VertexDragListener from './VertexDragListener.js';
import VertexKeyboardDragListener from './VertexKeyboardDragListener.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import GQGraph from '../model/GQGraph.js';

// constants
const COORDINATES_Y_SPACING = 1;

type SelfOptions = EmptySelfOptions;

type VertexManipulatorOptions = SelfOptions & PickRequired<GQManipulatorOptions, 'tandem' | 'phetioDocumentation'>;

export default class VertexManipulator extends GQManipulator {

  private readonly quadraticProperty: TReadOnlyProperty<Quadratic>;

  public constructor( hProperty: NumberProperty,
                      kProperty: NumberProperty,
                      quadraticProperty: TReadOnlyProperty<Quadratic>,
                      graph: GQGraph,
                      modelViewTransform: ModelViewTransform2,
                      vertexVisibleProperty: TReadOnlyProperty<boolean>,
                      coordinatesVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: VertexManipulatorOptions ) {

    const options = optionize4<VertexManipulatorOptions, SelfOptions, GQManipulatorOptions>()(
      {}, AccessibleDraggableOptions, {

        // GQManipulatorOptions
        radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        color: GQColors.vertexColorProperty,
        coordinatesForegroundColor: 'white',
        coordinatesBackgroundColor: GQColors.vertexColorProperty,
        coordinatesDecimals: GQConstants.VERTEX_DECIMALS,
        accessibleName: GraphingQuadraticsStrings.a11y.vertexManipulator.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.vertexManipulator.accessibleHelpTextStringProperty,
        phetioDocumentation: 'manipulator for the vertex'
      }, providedOptions );

    // position coordinates based on which way the parabola opens
    options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
      if ( coordinates ) {
        coordinatesNode.centerX = 0;
        const yOffset = radius + COORDINATES_Y_SPACING;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.top = yOffset;
        }
        else {
          coordinatesNode.bottom = -yOffset;
        }
      }
    };

    // coordinates correspond to the quadratic's vertex (if it has one)
    const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
      quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
        valueType: [ Vector2, null ],
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioDocumentation: 'coordinates displayed by on vertex manipulator, null means no vertex',
        phetioValueType: NullableIO( Vector2.Vector2IO )
      } );

    // visibility of this Node
    affirm( !options.visibleProperty, 'VertexManipulator sets visibleProperty' );
    options.visibleProperty = new DerivedProperty(
      [ vertexVisibleProperty, quadraticProperty ],
      ( vertexVisible, quadratic ) =>
        vertexVisible &&  // the Vertex checkbox is checked
        quadratic.isaParabola() && ( quadratic.vertex !== undefined ) && // the quadratic is a parabola, so has a vertex
        graph.contains( quadratic.vertex ), // the vertex is on the graph
      {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    this.quadraticProperty = quadraticProperty;

    this.addInputListener( new VertexDragListener( this, hProperty, kProperty, graph, modelViewTransform,
      options.tandem.createTandem( 'dragListener' ) ) );

    this.addInputListener( new VertexKeyboardDragListener( this, hProperty, kProperty,
      options.tandem.createTandem( 'keyboardDragListener' ) ) );

    // move the manipulator
    quadraticProperty.link( quadratic => {
      if ( quadratic.vertex ) {
        this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
      }
    } );

    // When this manipulator gets focus, describe it.
    this.focusedProperty.lazyLink( focused => {
      focused && this.doAccessibleObjectResponse();
    } );
  }

  /**
   * Adds an accessible object response that describes the vertex of the quadratic.
   */
  public doAccessibleObjectResponse(): void {
    const vertex = this.quadraticProperty.value.vertex;
    if ( vertex ) {
      const response = StringUtils.fillIn( GraphingQuadraticsStrings.a11y.vertexManipulator.accessibleObjectResponseStringProperty, {

        // Use the same formatting and number of decimal places as the visual UI.
        x: toFixedNumber( vertex.x, GQConstants.VERTEX_DECIMALS ),
        y: toFixedNumber( vertex.y, GQConstants.VERTEX_DECIMALS )
      } );
      this.addAccessibleObjectResponse( response );
    }
  }
}

graphingQuadratics.register( 'VertexManipulator', VertexManipulator );