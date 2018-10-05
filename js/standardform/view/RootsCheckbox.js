// Copyright 2018, University of Colorado Boulder

/**
 * 'Roots' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CheckboxWithTextAndIcon = require( 'GRAPHING_QUADRATICS/common/view/CheckboxWithTextAndIcon' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );

  // constants
  const POINT_RADIUS = 6;

  class RootsCheckbox extends CheckboxWithTextAndIcon {

    /**
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {Object} [options]
     */
    constructor( rootsVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const icon = new HBox( {
        align: 'center',
        spacing: 5,
        children: [
          new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } ),
          new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } )
        ]
      } );

      super( rootsString, icon, rootsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'RootsCheckbox', RootsCheckbox );
} );