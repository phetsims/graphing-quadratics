// Copyright 2018, University of Colorado Boulder

/**
 * Abstract base class for the accordion box that displays the interactive equation and related controls.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSeparator = require( 'SUN/HSeparator' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

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

      options = _.extend( {

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'the accordion box that contains the interactive equation',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }

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
          new HSeparator( separatorWidth, separatorOptions ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, separatorOptions ),
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

      options = _.extend( {

        // HBox options
        spacing: 40,
        align: 'center',

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'buttons that appear below the interactive equation',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }

      }, options );

      // Save button
      const saveButton = new RectangularPushButton( {
        content: new FontAwesomeNode( 'camera', { maxWidth: BUTTON_ICON_WIDTH } ),
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        listener: () => { model.saveQuadratic(); },
        tandem: options.tandem.createTandem( 'saveButton' ),
        phetioDocumentation: 'the button used to save a quadratic',
        phetioReadOnly: true // we don't want the client to modify this button, see #60
      } );

      // Erase button
      const eraseButton = new EraserButton( {
        iconWidth: BUTTON_ICON_WIDTH,
        listener: () => { model.eraseQuadratic(); },
        tandem: options.tandem.createTandem( 'eraseButton' ),
        phetioDocumentation: 'the button used to erase the saved quadratic',
        phetioReadOnly: true
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

  return GQEquationAccordionBox;
} );