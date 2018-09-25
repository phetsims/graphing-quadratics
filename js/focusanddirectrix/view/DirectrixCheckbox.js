// Copyright 2018, University of Colorado Boulder

/**
 * 'Directrix' checkbox.
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
  const Line = require( 'SCENERY/nodes/Line' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  class DirectrixCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {Object} [options]
     */
    constructor( directrixVisibleProperty, options ) {

      const label = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( directrixString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
          } ),

          // vertical dashed line
          new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[0], 0, {
            stroke: GQColors.DIRECTRIX,
            lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
            lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
          } )
        ]
      } );

      super( label, directrixVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'DirectrixCheckbox', DirectrixCheckbox );
} );