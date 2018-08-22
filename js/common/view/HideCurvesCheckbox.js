// Copyright 2018, University of Colorado Boulder

/**
 * 'Hide curves' checkbox, used in both screens.
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
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );

  class HideCurvesCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} linesVisibleProperty
     * @param {Object} [options]
     */
    constructor( linesVisibleProperty, options ) {

      var label = new Text( hideCurvesString, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
      } );

      // adapter to invert the semantics of linesVisibleProperty
      const hideCurvesProperty = new BooleanProperty( !linesVisibleProperty.value );
      linesVisibleProperty.lazyLink( linesVisible => { hideCurvesProperty.value = !linesVisible; } );
      hideCurvesProperty.lazyLink( hideCurves => { linesVisibleProperty.value = !hideCurves; } );

      super( label, hideCurvesProperty, options );
    }
  }

  return graphingQuadratics.register( 'HideCurvesCheckbox', HideCurvesCheckbox );
} );