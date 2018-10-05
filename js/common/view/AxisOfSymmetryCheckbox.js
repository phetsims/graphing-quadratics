// Copyright 2018, University of Colorado Boulder

/**
 * 'Axis of Symmetry' checkbox.
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
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );

  class AxisOfSymmetryCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {Object} [options]
     */
    constructor( axisOfSymmetryVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( axisOfSymmetryString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
            maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
          } ),

          // vertical dashed line
          new Line( 0, 0, 0, 5 * GQConstants.AXIS_OF_SYMMETRY_LINE_DASH[ 0 ], {
            stroke: GQColors.AXIS_OF_SYMMETRY,
            lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
            lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
          } )
        ]
      } );

      super( content, axisOfSymmetryVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryCheckbox', AxisOfSymmetryCheckbox );
} );