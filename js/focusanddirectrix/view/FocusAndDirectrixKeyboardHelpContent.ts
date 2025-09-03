// Copyright 2025, University of Colorado Boulder

/**
 * FocusAndDirectrixKeyboardHelpContent is the content for the keyboard-help dialog in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import { PointToolShortcutsSection } from '../../common/view/PointToolShortcutsSection.js';

export default class FocusAndDirectrixKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [

      // Point Tool Shortcuts
      new PointToolShortcutsSection(),

      // Slider Controls
      new SliderControlsKeyboardHelpSection()
    ];

    // Sections in the right column.
    const rightSections = [

      // Move Draggable Items
      new MoveDraggableItemsKeyboardHelpSection(),

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

graphingQuadratics.register( 'FocusAndDirectrixKeyboardHelpContent', FocusAndDirectrixKeyboardHelpContent );