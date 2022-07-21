// Copyright 2018-2022, University of Colorado Boulder

/**
 * Abstract base class for the accordion box that displays the interactive equation and related controls.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { HBox, Path, VBox } from '../../../../scenery/js/imports.js';
import cameraSolidShape from '../../../../sherpa/js/fontawesome-5/cameraSolidShape.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';

// constants
const BUTTON_ICON_WIDTH = 30;

class GQEquationAccordionBox extends AccordionBox {

  /**
   * @param {GQModel} model
   * @param {Node} interactiveEquationNode
   * @param {Object} [options]
   * @abstract
   */
  constructor( model, interactiveEquationNode, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'the accordion box that contains the interactive equation'

    }, GQConstants.ACCORDION_BOX_OPTIONS, options );

    // Buttons at the bottom of the accordion box
    const buttonGroup = new ButtonGroup( model, {
      tandem: options.tandem.createTandem( 'buttonGroup' )
    } );

    // properties of the horizontal separators
    const separatorWidth = Math.max( interactiveEquationNode.width, buttonGroup.width );
    const separatorOptions = { stroke: GQColors.SEPARATOR };

    const contentNode = new VBox( {
      align: 'center',
      spacing: 8,
      children: [
        new HSeparator( separatorWidth, merge( {
          tandem: options.tandem.createTandem( 'topSeparator' )
        }, separatorOptions ) ),
        interactiveEquationNode,
        new HSeparator( separatorWidth, merge( {
          tandem: options.tandem.createTandem( 'bottomSeparator' )
        }, separatorOptions ) ),
        buttonGroup
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'GQEquationAccordionBox', GQEquationAccordionBox );

/**
 * The buttons at the bottom of the accordion box.
 */
class ButtonGroup extends HBox {

  /**
   * @param {GQModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {

      // HBox options
      spacing: 40,
      align: 'center',

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'buttons that appear below the interactive equation'

    }, options );

    // Save button
    const saveButton = new RectangularPushButton( {
      content: new Path( cameraSolidShape, {
        maxWidth: BUTTON_ICON_WIDTH,
        fill: 'black'
      } ),
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      listener: () => { model.saveQuadratic(); },
      tandem: options.tandem.createTandem( 'saveButton' ),
      phetioDocumentation: 'the button used to save a quadratic',
      visiblePropertyOptions: { phetioReadOnly: true } // by designer request
    } );

    // Erase button
    const eraseButton = new EraserButton( {
      iconWidth: BUTTON_ICON_WIDTH,
      listener: () => { model.eraseQuadratic(); },
      tandem: options.tandem.createTandem( 'eraseButton' ),
      phetioDocumentation: 'the button used to erase the saved quadratic',
      visiblePropertyOptions: { phetioReadOnly: true } // by designer request
    } );

    assert && assert( !options.children, 'ButtonGroup sets children' );
    options.children = [ saveButton, eraseButton ];

    super( options );

    // Enable the erase button when there is a saved quadratic
    model.savedQuadraticProperty.link( savedQuadratic => {
      eraseButton.enabled = ( savedQuadratic !== null );
    } );
  }
}

graphingQuadratics.register( 'ButtonGroup', ButtonGroup );

export default GQEquationAccordionBox;