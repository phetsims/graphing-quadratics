// Copyright 2018, University of Colorado Boulder

/**
 * Common view for a screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

  class GQScreenView extends ScreenView {

    /**
     * @param {GQModel} model
     * @param {LineFormViewProperties[]} viewPropertiess - an array that holds elements of type LineFormViewProperties
     */
    constructor( model, viewPropertiess ) {

      super( GQConstants.SCREEN_VIEW_OPTIONS );

      // Reset All Button
      const resetAllButton = new ResetAllButton( {
        listener: function() {
          model.reset();
          viewPropertiess.forEach( viewProperties => { viewProperties.reset(); } );
        },
        right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN
      } );

      this.addChild( resetAllButton );

      // @protected
      this.resetAllButton = resetAllButton;
    }
  }

  return graphingQuadratics.register( 'GQScreenView', GQScreenView );
} );
