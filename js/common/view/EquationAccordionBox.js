// Copyright 2018, University of Colorado Boulder

//TODO Copied from GRAPHING_LINES/common/view/EquationAccordionBox
//TODO extend AccordionBox, not Panel
/**
 * Accordion box that contains the interactive equation and associated controls.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSeparator = require( 'SUN/HSeparator' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const BUTTON_ICON_WIDTH = 30;
  const SEPARATOR_OPTIONS = { stroke: GQColors.SEPARATOR };
  
  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {NumberProperty} numberOfSavedLinesProperty
     * @param {Object} [options]
     */
    constructor( interactiveEquationNode, saveFunction, eraseFunction, numberOfSavedLinesProperty, options ) {

      options = _.extend( {
        
        // superclass options
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        titleYMargin: 10,
        buttonLength: 25,
        buttonXMargin: 10,
        contentXMargin: 20,
        contentYMargin: 10
      }, options );

      // Save button
      const saveButton = new RectangularPushButton( {
        content: new FontAwesomeNode( 'camera', { maxWidth: BUTTON_ICON_WIDTH } ),
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        listener: saveFunction
      } );

      // Erase button
      const eraseButton = new EraserButton( { 
        iconWidth: BUTTON_ICON_WIDTH, 
        listener: eraseFunction 
      } );

      // horizontal layout of buttons
      const buttons = new HBox( {
        children: [ saveButton, eraseButton ],
        spacing: 40
      } );

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( interactiveEquationNode.width, SEPARATOR_OPTIONS ),
          interactiveEquationNode,
          new HSeparator( interactiveEquationNode.width, SEPARATOR_OPTIONS ),
          buttons
        ]
      } );

      super( content, options );
      
      // Disable the erase button when there are no saved lines.
      numberOfSavedLinesProperty.link( numberOfSavedLines => {
        eraseButton.enabled = ( numberOfSavedLines > 0 );
      } );
    }
  }

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );