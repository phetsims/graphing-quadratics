// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Decimals' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {DecimalsModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function DecimalsView( model, modelViewTransform ) {

    var thisView = this;
    ScreenView.call( thisView, GQConstants.SCREEN_VIEW_OPTIONS );

    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var rootNode = new Node( {
      children: [
        new Text( 'Decimals: under construction', { font: new GQFont( 24 ), center: this.layoutBounds.center } ), //TODO
        resetAllButton
      ]
    } );

    resetAllButton.right = this.layoutBounds.right - 30;
    resetAllButton.bottom = this.layoutBounds.bottom - 30;

    thisView.addChild( rootNode );
  }

  return inherit( ScreenView, DecimalsView );
} );
