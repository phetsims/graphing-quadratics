// Copyright 2018, University of Colorado Boulder

/**
 * 'Focus' checkbox.
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
  const focusString = require( 'string!GRAPHING_QUADRATICS/focus' );

  class FocusCheckbox extends CheckboxWithTextAndIcon {

    /**
     * @param {BooleanProperty} focusVisibleProperty
     * @param {Object} [options]
     */
    constructor( focusVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const icon = new Manipulator( 8, GQColors.FOCUS, { haloAlpha: 0, pickable: false } );

      super( focusString, icon, focusVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'FocusCheckbox', FocusCheckbox );
} );