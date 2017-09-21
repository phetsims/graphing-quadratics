// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
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
   * @param {VertexFormModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function VertexFormScreenView( model, modelViewTransform ) {

    ScreenView.call( this, GQConstants.SCREEN_VIEW_OPTIONS );

    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var rootNode = new Node( {
      children: [
        new Text( 'Vertex Form: under construction', { font: new GQFont( 24 ), center: this.layoutBounds.center } ), //TODO
        resetAllButton
      ]
    } );

    resetAllButton.right = this.layoutBounds.right - 30;
    resetAllButton.bottom = this.layoutBounds.bottom - 30;

    this.addChild( rootNode );
  }

  graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );

  return inherit( ScreenView, VertexFormScreenView );
} );
