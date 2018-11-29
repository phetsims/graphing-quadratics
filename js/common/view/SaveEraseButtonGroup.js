// Copyright 2018, University of Colorado Boulder

/**
 * The buttons used to save and erase a curve, grouped together in a horizontal layout.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const BUTTON_ICON_WIDTH = 30;

  class SaveEraseButtonGroup extends HBox {

    /**
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {Property.<Quadratic>} savedQuadraticProperty
     * @param {Object} [options]
     */
    constructor( saveFunction, eraseFunction, savedQuadraticProperty, options ) {

      options = _.extend( {
        
        // HBox options
        spacing: 40,
        align: 'center',

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'buttons that appear below the interactive equation',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } } // feature visibleProperty

      }, options );

      // Save button
      const saveButton = new RectangularPushButton( {
        content: new FontAwesomeNode( 'camera', { maxWidth: BUTTON_ICON_WIDTH } ),
        baseColor: PhetColorScheme.BUTTON_YELLOW,
        listener: saveFunction,
        tandem: options.tandem.createTandem( 'saveButton' ),
        phetioDocumentation: 'the button used to save a quadratic',
        phetioReadOnly: true // we don't want the client to modify this button, see #60
      } );

      // Erase button
      const eraseButton = new EraserButton( {
        iconWidth: BUTTON_ICON_WIDTH,
        listener: eraseFunction,
        tandem: options.tandem.createTandem( 'eraseButton' ),
        phetioDocumentation: 'the button used to erase the saved quadratic',
        phetioReadOnly: true
      } );

      assert && assert( !options.children, 'SaveEraseButtonGroup sets children' );
      options.children = [ saveButton, eraseButton ];

      super( options );

      // Enable the erase button when there is a saved quadratic
      savedQuadraticProperty.link( savedQuadratic => {
        eraseButton.enabled = ( savedQuadratic !== null );
      } );
    }
  }

  return graphingQuadratics.register( 'SaveEraseButtonGroup', SaveEraseButtonGroup );
} ); 