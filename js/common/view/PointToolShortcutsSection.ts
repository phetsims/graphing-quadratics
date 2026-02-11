// Copyright 2025, University of Colorado Boulder

/**
 * PointToolShortcutsSection is the keyboard help section that describes keyboard shortcuts for the point tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import JumpToNextCurveListener from './JumpToNextCurveListener.js';
import MoveOffGraphListener from './MoveOffGraphListener.js';

export default class PointToolShortcutsSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // J, for 'Jump to next curve.'
      KeyboardHelpSectionRow.fromHotkeyData( JumpToNextCurveListener.HOTKEY_DATA ),

      // K, for 'Move off grid.'
      KeyboardHelpSectionRow.fromHotkeyData( MoveOffGraphListener.HOTKEY_DATA )
    ];

    super( GraphingQuadraticsStrings.keyboardHelpDialog.pointToolShortcutsStringProperty, rows, {
      textMaxWidth: 300,
      isDisposable: false
    } );
  }
}

graphingQuadratics.register( 'PointToolShortcutsSection', PointToolShortcutsSection );