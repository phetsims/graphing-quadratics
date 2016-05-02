// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'Integers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {IntegersModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function IntegersView( model, modelViewTransform ) {

    var thisView = this;
    ScreenView.call( thisView, GQConstants.SCREEN_VIEW_OPTIONS );

    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var rootNode = new Node( {
      children: [
        new Text( 'Integers: under construction', { font: new GQFont( 24 ), center: this.layoutBounds.center } ),
        resetAllButton
      ]
    } );

    resetAllButton.right = this.layoutBounds.right - 30;
    resetAllButton.bottom = this.layoutBounds.bottom - 30;

    thisView.addChild( rootNode );
  }

  graphingQuadratics.register( 'IntegersView', IntegersView );

  return inherit( ScreenView, IntegersView );
} );
