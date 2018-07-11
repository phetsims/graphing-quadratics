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
   * @constructor
   */
  function VertexFormScreenView( model ) {
    GQScreenView.call( this, model );
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
      return new GQSceneNode( scene, this.layoutBounds, new Text( 'under construction ' ) );
    }
  } );
} );
