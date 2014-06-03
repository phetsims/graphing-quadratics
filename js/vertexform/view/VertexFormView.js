// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {VertexFormModel} model
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function VertexFormView( model, mvt ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      }
    } );

    var underConstruction = new Text( 'Vertex Form: under construction',
      { font: new PhetFont( 24 ), center: this.layoutBounds.center } );

    var rootNode = new Node( { children: [
      underConstruction,
      resetAllButton
    ] } );

    resetAllButton.right = this.layoutBounds.right - 30;
    resetAllButton.bottom = this.layoutBounds.bottom - 30;

    thisView.addChild( rootNode );
  }

  return inherit( ScreenView, VertexFormView );
} );
