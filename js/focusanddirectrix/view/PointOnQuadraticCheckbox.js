// Copyright 2018, University of Colorado Boulder

/**
 * 'Point on Quadratic' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CheckboxWithTextAndIcon = require( 'GRAPHING_QUADRATICS/common/view/CheckboxWithTextAndIcon' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const pointOnQuadraticString = require( 'string!GRAPHING_QUADRATICS/pointOnQuadratic' );

  class PointOnQuadraticCheckbox extends CheckboxWithTextAndIcon {

    /**
     * @param {BooleanProperty} pointOnQuadraticVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointOnQuadraticVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const icon = new Manipulator( 8, GQColors.POINT_ON_QUADRATIC, { haloAlpha: 0, pickable: false } );

      super( pointOnQuadraticString, icon, pointOnQuadraticVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'PointOnQuadraticCheckbox', PointOnQuadraticCheckbox );
} );