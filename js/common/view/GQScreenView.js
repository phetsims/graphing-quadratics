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
  var SceneControl = require( 'GRAPHING_QUADRATICS/common/view/SceneControl' );

  /**
   * @param {GQModel} model
   * @constructor
   */
  function GQScreenView( model ) {
    var self = this;

    ScreenView.call( this, GQConstants.SCREEN_VIEW_OPTIONS );

    // Reset All Button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( resetAllButton );

    // @private {EqualityExplorerScene[]} create the view for each scene
    this.sceneNodes = [];
    model.scenes.forEach( function( scene ) {
      var sceneNode = self.createSceneNode( scene );
      self.sceneNodes.push( sceneNode );
      self.addChild( sceneNode );
    } );

    // If the model has more than 1 scene, create a control for scene selection.
    if ( model.scenes.length > 1 ) {

      // Get the bounds of the Snapshot accordion box, relative to this ScreenView
      var controlsParent = this.sceneNodes[ 0 ].controlsParent;

      // Center the scene control in the space below the Snapshots accordion box
      var sceneControl = new SceneControl( model.sceneProperty, model.scenes, {
        centerX: controlsParent.centerX,
        centerY: controlsParent.bottom + ( resetAllButton.top - controlsParent.bottom ) / 2
      } );
      this.addChild( sceneControl );
    }

    // Make the selected scene visible. unlink not needed.
    model.sceneProperty.link( function( scene ) {
      for ( var i = 0; i < self.sceneNodes.length; i++ ) {
        self.sceneNodes[ i ].visible = ( self.sceneNodes[ i ].scene === scene );
      }
    } );
  }

  graphingQuadratics.register( 'GQScreenView', GQScreenView, {

    /**
     * Creates the Node for this scene.
     * @param {GQScene} scene
     * @returns {Node}
     * @protected
     * @abstract
     */
    createSceneNode: function( scene ) {
      throw new Error( 'createSceneNode must be implemented by subtype' );
    }
  } );

  return inherit( ScreenView, GQScreenView );
} );
