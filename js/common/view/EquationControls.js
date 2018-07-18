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
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var ExpandCollapseButton = require( 'SUN/ExpandCollapseButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var ICON_WIDTH = 30;
  var Y_SPACING = 10;
  var TITLE_X_SPACING = 5;
  var SAVE_LINE_ICON = new FontAwesomeNode( 'camera', { maxWidth: ICON_WIDTH } );

  /**
   * @param {Node} titleNode - a display of the general form of the equation
   * @param {Node} interactiveEquationNode - interactive equation
   * @param {function} saveFunction
   * @param {function} eraseFunction
   * @param {Object} [options]
   * @constructor
   */
  function EquationControls( titleNode, interactiveEquationNode, saveFunction, eraseFunction, options ) {

    options = _.extend( {
      fill: GQColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 10,
      yMargin: 10
    }, options );

    // TODO: temporary. will be passed in as parameters.
    var maximizedProperty = new BooleanProperty( true );

    // Expand/collapse button
    var expandCollapseButton = new ExpandCollapseButton( maximizedProperty );

    // Save line button
    var saveLineButton = new RectangularPushButton( {
      content: SAVE_LINE_ICON,
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      listener: saveFunction
    } );

    // Erase lines button
    var eraseLinesButton = new EraserButton( { iconWidth: ICON_WIDTH, listener: eraseFunction } );

    // horizontal layout of buttons
    var buttons = new HBox( {
      children: [ saveLineButton, eraseLinesButton ],
      spacing: 40
    } );

    var contentWidth = Math.max(
      buttons.width,
      interactiveEquationNode.width,
      ( expandCollapseButton.width + titleNode.width + TITLE_X_SPACING )
    );

    // Stuff that is hidden when minimized must be attached to this node.
    var separatorColor = 'rgb( 212, 212, 212 )';
    var subContent = new VBox( {
      spacing: Y_SPACING,
      align: 'center',
      children: [
        new Line( 0, 0, contentWidth, 0, { stroke: separatorColor } ),
        interactiveEquationNode,
        new Line( 0, 0, contentWidth, 0, { stroke: separatorColor } ),
        buttons
      ]
    } );

    // Top-level content, with strut to prevent panel from resizing
    var content = new Node( {
      children: [ new HStrut( contentWidth ), expandCollapseButton, titleNode, subContent  ]
    } );
    titleNode.centerX = contentWidth / 2;
    titleNode.centerY = expandCollapseButton.centerY;
    subContent.top = Math.max( expandCollapseButton.bottom, titleNode.bottom ) + Y_SPACING;

    maximizedProperty.link( function( maximized ) {
      if ( maximized && content.indexOfChild( subContent ) === -1 ) {
        content.addChild( subContent );
      }
      else if ( !maximized && content.indexOfChild( subContent ) !== -1 ) {
        content.removeChild( subContent );
      }
    } );

    Panel.call( this, content, options );
  }

  graphingQuadratics.register( 'EquationControls', EquationControls );

  return inherit( Panel, EquationControls );
} );