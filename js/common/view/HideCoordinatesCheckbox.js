// Copyright 2018, University of Colorado Boulder

/**
 * 'Hide coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const hideCoordinatesString = require( 'string!GRAPHING_QUADRATICS/hideCoordinates' );

  class HideCoordinatesCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( coordinatesVisibleProperty, options ) {

      const label = new Text( hideCoordinatesString, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
      } );

      // adapter to invert the semantics of coordinatesVisibleProperty
      const hideCoordinatesProperty = new BooleanProperty( !coordinatesVisibleProperty.value );
      coordinatesVisibleProperty.lazyLink( coordinatesVisible => { hideCoordinatesProperty.value = !coordinatesVisible; } );
      hideCoordinatesProperty.lazyLink( hideCoordinates => { coordinatesVisibleProperty.value = !hideCoordinates; } );

      super( label, hideCoordinatesProperty, options );
    }
  }

  return graphingQuadratics.register( 'HideCoordinatesCheckbox', HideCoordinatesCheckbox );
} );