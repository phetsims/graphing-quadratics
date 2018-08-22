// Copyright 2018, University of Colorado Boulder

/**
 * Abstract base type for ScreenViews in this sim.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

  class GQScreenView extends ScreenView {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties[]} viewPropertiesArray - view Properties for each scene
     * @abstract
     */
    constructor( model, viewPropertiesArray ) {

      super( GQConstants.SCREEN_VIEW_OPTIONS );

      // Reset All Button
      const resetAllButton = new ResetAllButton( {
        listener: function() {
          model.reset();
          viewPropertiesArray.forEach( viewProperties => { viewProperties.reset(); } );
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
