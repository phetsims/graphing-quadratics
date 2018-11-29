// Copyright 2018, University of Colorado Boulder

/**
 * 'Axis of Symmetry' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );

  // strings
  const axisOfSymmetryString = require( 'string!GRAPHING_QUADRATICS/axisOfSymmetry' );

  class AxisOfSymmetryCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {Object} [options]
     */
    constructor( axisOfSymmetryVisibleProperty, options ) {

      options = _.extend( {

        // phet-io
        phetioDocumentation: 'checkbox that makes the axis of symmetry visible on the graph'

      }, options );

      // icon is a vertical dashed line
      assert && assert( !options.icon, 'AxisOfSymmetryCheckbox sets icon' );
      options.icon = new Line( 0, 0, 0, 5 * GQConstants.AXIS_OF_SYMMETRY_LINE_DASH[ 0 ], {
        stroke: GQColors.AXIS_OF_SYMMETRY,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );

      super( axisOfSymmetryString, axisOfSymmetryVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryCheckbox', AxisOfSymmetryCheckbox );
} );