// Copyright 2025, University of Colorado Boulder

/**
 * VertexFormKeyboardHelpContent is the content for the keyboard-help dialog in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import PointToolShortcutsSection from '../../common/view/PointToolShortcutsSection.js';
import SpinnerControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SpinnerControlsKeyboardHelpSection.js';

export default class VertexFormKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [

      // Point Tool Shortcuts
      new PointToolShortcutsSection(),

      // Move Draggable Items
      new MoveDraggableItemsKeyboardHelpSection(),

      // Spinner Controls
      new SpinnerControlsKeyboardHelpSection( {
        includeSmallerStepsRow: false
      } )
    ];

    // Sections in the right column.
    const rightSections = [

      // Basic Actions
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

graphingQuadratics.register( 'VertexFormKeyboardHelpContent', VertexFormKeyboardHelpContent );