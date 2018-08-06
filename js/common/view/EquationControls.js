// Copyright 2018, University of Colorado Boulder

//TODO Copied from GRAPHING_LINES/common/view/EquationControls
/**
 * Control panel for interactive-equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const ExpandCollapseButton = require( 'SUN/ExpandCollapseButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const ICON_WIDTH = 30;
  const Y_SPACING = 10;
  const TITLE_X_SPACING = 5;
  const SAVE_ICON = new FontAwesomeNode( 'camera', { maxWidth: ICON_WIDTH } );

  class EquationControls extends Panel {

    /**
     * @param {Node} titleNode - a display of the general form of the equation
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {Object} [options]
     */
    constructor( titleNode, interactiveEquationNode, saveFunction, eraseFunction, options ) {

      options = _.extend( {
        
        // superclass options
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 10,
        yMargin: 10
      }, options );

      // TODO: temporary. will be passed in as a parameter.
      const maximizedProperty = new BooleanProperty( true );

      // Expand/collapse button
      const expandCollapseButton = new ExpandCollapseButton( maximizedProperty );

      // Save line button
      const saveButton = new RectangularPushButton( {
        content: SAVE_ICON,
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        listener: saveFunction
      } );

      // Erase lines button
      const eraseButton = new EraserButton( { iconWidth: ICON_WIDTH, listener: eraseFunction } );

      // horizontal layout of buttons
      const buttons = new HBox( {
        children: [ saveButton, eraseButton ],
        spacing: 40
      } );

      const contentWidth = Math.max(
        buttons.width,
        interactiveEquationNode.width,
        expandCollapseButton.width + titleNode.width + TITLE_X_SPACING
      );

      // Stuff that is hidden when minimized must be attached to this node.
      const separatorColor = 'rgb( 212, 212, 212 )';
      const subContent = new VBox( {
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
      const content = new Node( {
        children: [ new HStrut( contentWidth ), expandCollapseButton, titleNode, subContent ]
      } );
      titleNode.centerX = contentWidth / 2;
      titleNode.centerY = expandCollapseButton.centerY;
      subContent.top = Math.max( expandCollapseButton.bottom, titleNode.bottom ) + Y_SPACING;

      maximizedProperty.link( maximized => {
        if ( maximized && content.indexOfChild( subContent ) === -1 ) {
          content.addChild( subContent );
        }
        else if ( !maximized && content.indexOfChild( subContent ) !== -1 ) {
          content.removeChild( subContent );
        }
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'EquationControls', EquationControls );
} );