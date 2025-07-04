// Copyright 2018-2025, University of Colorado Boulder

/**
 * Abstract base class for the accordion box that displays the interactive equation and related controls.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQModel from '../model/GQModel.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

const BUTTON_ICON_WIDTH = 30;

type SelfOptions = EmptySelfOptions;

export type GQEquationAccordionBoxOptions = SelfOptions & AccordionBoxOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class GQEquationAccordionBox extends AccordionBox {

  public constructor( model: GQModel, interactiveEquationNode: Node, providedOptions: GQEquationAccordionBoxOptions ) {

    const options = optionize4<GQEquationAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, GQConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        isDisposable: false,
        phetioDocumentation: 'the accordion box that contains the interactive equation'
      }, providedOptions );

    // Buttons at the bottom of the accordion box
    const buttonGroup = new ButtonGroup( model, options.tandem.createTandem( 'buttonGroup' ) );

    const vBox = new VBox( {
      align: 'center',
      spacing: 8,
      children: [
        interactiveEquationNode,
        new HSeparator( {
          stroke: GQColors.separatorStrokeProperty
        } ),
        buttonGroup
      ]
    } );

    // The line at the top of the content does not behave like a scenery separator, because we want it to appear when
    // there's nothing above it, to visually separate the content from the title. So we use an HSeparator, but configure
    // it with isSeparator: false. See https://github.com/phetsims/graphing-quadratics/issues/193
    const topLine = new HSeparator( {
      stroke: GQColors.separatorStrokeProperty,
      layoutOptions: {
        stretch: true, // Not sure why this is needed. Are nested options not being combined correctly in Separator.ts?
        isSeparator: false
      },

      // If there's nothing visible below the top line, hide it.
      visibleProperty: new DerivedProperty( [ vBox.boundsProperty ], bounds => !bounds.isEmpty() )
    } );

    const contentNode = new VBox( {
      spacing: 8,
      align: 'center',
      children: [ topLine, vBox ]
    } );

    super( contentNode, options );
  }
}

/**
 * The buttons at the bottom of the accordion box.
 */
class ButtonGroup extends HBox {

  public constructor( model: GQModel, tandem: Tandem ) {

    const options: HBoxOptions = {
      spacing: 40,
      align: 'center',
      tandem: tandem,
      phetioDocumentation: 'buttons that appear below the interactive equation',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    };

    // Save button
    const saveButton = new RectangularPushButton( {
      content: new Path( cameraSolidShape, {
        maxWidth: BUTTON_ICON_WIDTH,
        fill: 'black'
      } ),
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      listener: () => { model.saveQuadratic(); },
      accessibleName: GraphingQuadraticsStrings.a11y.saveButton.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.saveButton.accessibleHelpTextStringProperty,
      tandem: tandem.createTandem( 'saveButton' ),
      phetioDocumentation: 'the button used to save a quadratic',
      visiblePropertyOptions: {
        phetioFeatured: false,
        phetioReadOnly: true // by designer request
      },
      enabledPropertyOptions: {
        phetioFeatured: false
      }
    } );

    // Erase button
    const eraseButton = new EraserButton( {
      iconWidth: BUTTON_ICON_WIDTH,
      listener: () => { model.eraseQuadratic(); },
      accessibleName: GraphingQuadraticsStrings.a11y.eraseButton.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.eraseButton.accessibleHelpTextStringProperty,
      tandem: tandem.createTandem( 'eraseButton' ),
      phetioDocumentation: 'the button used to erase the saved quadratic',
      visiblePropertyOptions: {
        phetioFeatured: false,
        phetioReadOnly: true // by designer request
      },
      enabledPropertyOptions: {
        phetioFeatured: false
      }
    } );

    options.children = [ saveButton, eraseButton ];

    super( options );

    // Enable the erase button when there is a saved quadratic
    model.savedQuadraticProperty.link( savedQuadratic => {
      eraseButton.enabled = ( savedQuadratic !== null );
    } );
  }
}

graphingQuadratics.register( 'GQEquationAccordionBox', GQEquationAccordionBox );