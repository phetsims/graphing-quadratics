// Copyright 2018, University of Colorado Boulder

/**
 * 'Focus' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const focusString = require( 'string!GRAPHING_QUADRATICS/focus' );

  class FocusCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} focusVisibleProperty
     * @param {Object} [options]
     */
    constructor( focusVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( focusString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
            maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
          } ),

          // manipulator icon
          new Manipulator( 8, GQColors.FOCUS, { haloAlpha: 0, pickable: false } )
        ]
      } );

      super( content, focusVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'FocusCheckbox', FocusCheckbox );
} );