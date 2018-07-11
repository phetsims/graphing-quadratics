// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  var GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {VertexFormModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function VertexFormScreenView( model, modelViewTransform ) {
    GQScreenView.call( this, model, modelViewTransform );
  }

  graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );

  return inherit( GQScreenView, VertexFormScreenView, {

    /**
     * Creates the Node for this scene.
     * @param {GQScene} scene
     * @returns {Node}
     * @protected
     * @abstract
     */
    createSceneNode: function( scene ) {
      return new GQSceneNode( scene, scene.modelViewTransform, this.layoutBounds, new Text( 'under construction ' ) );
    }
  } );
} );
