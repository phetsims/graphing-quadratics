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
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {GQModel} model
   * @param {LineFormViewProperties[]} viewPropertiess
   * @constructor
   */
  function GQScreenView( model, viewPropertiess ) {

    ScreenView.call( this, GQConstants.SCREEN_VIEW_OPTIONS );

    // Reset All Button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewPropertiess.forEach( function( viewProperties ) { viewProperties.reset(); } );
      },
      right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( resetAllButton );

  }

  graphingQuadratics.register( 'GQScreenView', GQScreenView );

  return inherit( ScreenView, GQScreenView );
} );
