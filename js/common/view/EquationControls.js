// Copyright 2018, University of Colorado Boulder

/**
 * Control panel for interactive-equation. Copied from graphing-lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Checkbox = require( 'SUN/Checkbox' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );

  // constants
  var ICON_WIDTh = 30;

  /**
   * @constructor
   */
  function EquationControls( options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 10,
      yMargin: 10
    }, options );

    // Save Line button
    var saveLineIcon = new FontAwesomeNode( 'camera', { maxWidth: ICON_WIDTh } );
    var saveLineButton = new RectangularPushButton( {
      content: saveLineIcon,
      baseColor: PhetColorScheme.BUTTON_YELLOW
    } );

    // Erase Lines button
    var eraseLinesButton = new EraserButton( { iconWidth: ICON_WIDTh } );

    // Hide Lines checkbox
    var hideLinesIcon = new FontAwesomeNode( 'eye_close', { maxWidth: ICON_WIDTh } );
    var hideLinesCheckbox = new Checkbox( hideLinesIcon, new BooleanProperty( false ) );

    // horizontal layout of buttons
    var buttons = new HBox( {
      children: [ saveLineButton, eraseLinesButton, hideLinesCheckbox ],
      spacing: 40
    } );

    Panel.call( this, buttons, options );
  }

  graphingQuadratics.register( 'EquationControls', EquationControls );

  return inherit( Panel, EquationControls );
} );