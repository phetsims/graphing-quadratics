// Copyright 2018, University of Colorado Boulder

/**
 * 'Point on Quadratic' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );

  // strings
  const pointOnParabolaString = require( 'string!GRAPHING_QUADRATICS/pointOnParabola' );

  class PointOnParabolaCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} pointOnParabolaVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointOnParabolaVisibleProperty, options ) {

      options = options || {};

      // icon is a manipulator (3D sphere)
      assert && assert( !options.icon, 'PointOnParabolaCheckbox sets icon' );
      options.icon = new Manipulator( 8, GQColors.POINT_ON_PARABOLA, { haloAlpha: 0, pickable: false } );

      super( pointOnParabolaString, pointOnParabolaVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'PointOnParabolaCheckbox', PointOnParabolaCheckbox );
} );