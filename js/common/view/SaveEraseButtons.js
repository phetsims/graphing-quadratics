// Copyright 2018, University of Colorado Boulder

/**
 * Controls related to saved curves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
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
     * @param {NumberProperty} numberOfSavedLinesProperty
     * @param {Object} [options]
     */
    constructor( saveFunction, eraseFunction, numberOfSavedLinesProperty, options ) {

      options = _.extend( {
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

      // Enable the erase button when there are saved lines.
      numberOfSavedLinesProperty.link( numberOfSavedLines => {
        eraseButton.enabled = ( numberOfSavedLines > 0 );
      } );
    }
  }

  return graphingQuadratics.register( 'SaveEraseButtons', SaveEraseButtons );
} ); 