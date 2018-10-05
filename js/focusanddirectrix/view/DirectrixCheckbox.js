// Copyright 2018, University of Colorado Boulder

/**
 * 'Directrix' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CheckboxWithTextAndIcon = require( 'GRAPHING_QUADRATICS/common/view/CheckboxWithTextAndIcon' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  class DirectrixCheckbox extends CheckboxWithTextAndIcon {

    /**
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {Object} [options]
     */
    constructor( directrixVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      // vertical dashed line
      const icon = new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[ 0 ], 0, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );

      super( directrixString, icon, directrixVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'DirectrixCheckbox', DirectrixCheckbox );
} );