// Copyright 2018-2023, University of Colorado Boulder

/**
 * Abstract base class for the accordion box that displays the interactive equation and related controls.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { HBox, HBoxOptions, HSeparator, Line, Node, Path, VBox } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQModel from '../model/GQModel.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

const BUTTON_ICON_WIDTH = 30;
const SEPARATOR_LINE_WIDTH = 1;

type SelfOptions = EmptySelfOptions;

export type GQEquationAccordionBoxOptions = SelfOptions & AccordionBoxOptions & PickRequired<AccordionBoxOptions, 'tandem'>;

export default class GQEquationAccordionBox extends AccordionBox {

  public constructor( model: GQModel, interactiveEquationNode: Node, providedOptions: GQEquationAccordionBoxOptions ) {

    const options = optionize4<GQEquationAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, GQConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        phetioDocumentation: 'the accordion box that contains the interactive equation'
      }, providedOptions );

    // Buttons at the bottom of the accordion box
    const buttonGroup = new ButtonGroup( model, options.tandem.createTandem( 'buttonGroup' ) );

    const bottomSeparator = new HSeparator( {
      stroke: GQColors.SEPARATOR,
      lineWidth: SEPARATOR_LINE_WIDTH
    } );

    // Scenery layout has a very literal definition of 'separator' - there must be a visible Node about and below it,
    // or it will automatically be made visible. For this sim, we want a separator at the top of the content, to
    // make the content distinct from the accordion box title.  So we need to roll our own separator in this case.
    // See https://github.com/phetsims/graphing-quadratics/issues/193.
    const topSeparator = new Line( 0, 0, 1, 0, {
      stroke: GQColors.SEPARATOR,
      lineWidth: SEPARATOR_LINE_WIDTH,
      visibleProperty: new DerivedProperty(
        [ interactiveEquationNode.boundsProperty, buttonGroup.boundsProperty ],
        ( interactiveEquationNodeBounds, buttonGroupBounds ) =>
          interactiveEquationNodeBounds.height + buttonGroupBounds.height > 0 )
    } );

    // Make the width of the top separator the same as the bottom separator.
    bottomSeparator.boundsProperty.link( bounds => topSeparator.setLine( 0, 0, bounds.width, 0 ) );

    const contentNode = new VBox( {
      align: 'center',
      spacing: 8,
      children: [
        topSeparator,
        interactiveEquationNode,
        bottomSeparator,
        buttonGroup
      ]
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