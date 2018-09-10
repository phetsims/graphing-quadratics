// Copyright 2018, University of Colorado Boulder

/**
 * 'Hide curves' checkbox.
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
     * @param {BooleanProperty} curvesVisibleProperty
     * @param {Object} [options]
     */
    constructor( curvesVisibleProperty, options ) {

      const label = new Text( hideCurvesString, {
        font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
      } );

      // adapter to invert the semantics of curvesVisibleProperty
      const hideCurvesProperty = new BooleanProperty( !curvesVisibleProperty.value );
      curvesVisibleProperty.lazyLink( curvesVisible => { hideCurvesProperty.value = !curvesVisible; } );
      hideCurvesProperty.lazyLink( hideCurves => { curvesVisibleProperty.value = !hideCurves; } );

      super( label, hideCurvesProperty, options );
    }
  }

  return graphingQuadratics.register( 'HideCurvesCheckbox', HideCurvesCheckbox );
} );