// Copyright 2018, University of Colorado Boulder

/**
 * The buttons used to save and erase a line, grouped together in a horizontal layout.
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

  class SaveEraseButtons extends HBox {

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
        tandem: Tandem.required
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

      assert && assert( !options.children, 'SaveEraseButtons sets children' );
      options.children = [ saveButton, eraseButton ];

      super( options );

      // Enable the erase button when there is a saved quadratic
      savedQuadraticProperty.link( savedQuadratic => {
        eraseButton.enabled = ( savedQuadratic !== null );
      } );
    }
  }

  return graphingQuadratics.register( 'SaveEraseButtons', SaveEraseButtons );
} ); 