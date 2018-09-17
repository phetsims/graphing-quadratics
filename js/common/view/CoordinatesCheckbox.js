// Copyright 2018, University of Colorado Boulder

/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const coordinatesString = require( 'string!GRAPHING_QUADRATICS/coordinates' );

  class CoordinatesCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( coordinatesVisibleProperty, options ) {

      const label = new Text( coordinatesString, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
      } );

      super( label, coordinatesVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );
} );