// Copyright 2025, University of Colorado Boulder

/**
 * PointToolShortcutsSection is the keyboard help section that describes keyboard shortcuts for the point tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import PointToolNode from './PointToolNode.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export class PointToolShortcutsSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // J, for 'Jump to next curve.'
      KeyboardHelpSectionRow.fromHotkeyData( PointToolNode.JUMP_TO_NEXT_CURVE_HOTKEY_DATA, {
        pdomLabelStringProperty: GraphingQuadraticsStrings.a11y.keyboardHelpDialog.jumpToNextCurveDescriptionStringProperty
      } ),

      // K, for 'Move off grid.'
      KeyboardHelpSectionRow.fromHotkeyData( PointToolNode.MOVE_OFF_GRID_HOTKEY_DATA, {
        pdomLabelStringProperty: GraphingQuadraticsStrings.a11y.keyboardHelpDialog.moveOffGridDescriptionStringProperty
      } )
    ];

    super( GraphingQuadraticsStrings.keyboardHelpDialog.pointToolShortcutsStringProperty, rows, {
      textMaxWidth: 300,
      isDisposable: false
    } );
  }
}

graphingQuadratics.register( 'PointToolShortcutsSection', PointToolShortcutsSection );