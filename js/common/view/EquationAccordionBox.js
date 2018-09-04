// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box that contains the interactive equation and associated controls.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSeparator = require( 'SUN/HSeparator' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const Property = require( 'AXON/Property' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const BUTTON_ICON_WIDTH = 30;
  const SEPARATOR_OPTIONS = { stroke: 'rgb( 212, 212, 212 )' };
  
  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {BooleanProperty} linesVisibleProperty
     * @param {NumberProperty} numberOfSavedLinesProperty
     * @param {Object} [options]
     */
    constructor( interactiveEquationNode, saveFunction, eraseFunction,
                 linesVisibleProperty, numberOfSavedLinesProperty, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

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

      // Enable the save button when lines are visible. unlink not needed.
      linesVisibleProperty.link( linesVisible => { saveButton.enabled = linesVisible; } );

      // Enable the erase button when lines are visible and there are saved lines. dispose not needed.
      Property.multilink( [ linesVisibleProperty, numberOfSavedLinesProperty ],
        ( linesVisible, numberOfSavedLines ) => {
        eraseButton.enabled = linesVisible && ( numberOfSavedLines > 0 );
      } );
    }
  }

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );