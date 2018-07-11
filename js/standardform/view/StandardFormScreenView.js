// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  var GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {StandardFormModel} model
   * @constructor
   */
  function StandardFormScreenView( model ) {
    GQScreenView.call( this, model );
  }

  graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );

  return inherit( GQScreenView, StandardFormScreenView, {

    /**
     * Creates the Node for this scene.
     * @param {GQScene} scene
     * @returns {Node}
     * @protected
     * @abstract
     */
    createSceneNode: function( scene ) {
      return new GQSceneNode( scene, this.layoutBounds, new StandardFormEquationNode() );
    }
  } );
} );
