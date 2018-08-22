// Copyright 2018, University of Colorado Boulder

/**
 * 'Axis of Symmetry' checkbox, used in both screens.
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
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );

  // constants
  const DASH_LENGTH = 5;

  class AxisOfSymmetryCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {Object} [options]
     */
    constructor( axisOfSymmetryVisibleProperty, options ) {

      const label = new HBox( {
        align: 'center',
        spacing: 15,
        children: [

          // text
          new Text( axisOfSymmetryString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
          } ),

          // vertical dashed line
          new Line( 0, 0, 0, 5 * DASH_LENGTH, {
            stroke: GQColors.VERTEX,
            lineWidth: 3,
            lineDash: [ DASH_LENGTH, DASH_LENGTH ]
          } )
        ]
      } );

      super( label, axisOfSymmetryVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryCheckbox', AxisOfSymmetryCheckbox );
} );