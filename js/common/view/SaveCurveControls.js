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
  const Property = require( 'AXON/Property' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );

  // constants
  const BUTTON_ICON_WIDTH = 30;
  
  class SaveCurveControls extends HBox {

    /**
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {NumberProperty} numberOfSavedLinesProperty
     * @param {Object} [options]
     */
    constructor( saveFunction, eraseFunction, numberOfSavedLinesProperty, options ) {

      options = _.extend( {
        spacing: 40
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
      
      assert && assert( !options.children, 'SaveCurveControls sets children' );
      options.children = [ saveButton, eraseButton ];
      
      super( options );

      // Enable the erase button when there are saved lines.
      numberOfSavedLinesProperty.link( numberOfSavedLines => {
        eraseButton.enabled = ( numberOfSavedLines > 0 );
      } );
    }
  }

  return graphingQuadratics.register( 'SaveCurveControls', SaveCurveControls );
} ); 