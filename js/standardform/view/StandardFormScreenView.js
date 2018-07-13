// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
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
  var IntegerCoefficientsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegerCoefficientsInteractiveEquationNode' );
  var SceneControl = require( 'GRAPHING_QUADRATICS/standardform/view/SceneControl' );
  var StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {StandardFormModel} model
   * @constructor
   */
  function StandardFormScreenView( model ) {
    var self = this;

    GQScreenView.call( this, model );

    var sceneNodes = [
      new GQSceneNode(
        model.integerCoefficientsScene,
        this.layoutBounds,
        new StandardFormEquationNode(),
        new IntegerCoefficientsInteractiveEquationNode()
      ),
      new GQSceneNode(
        model.decimalCoefficientsScene,
        this.layoutBounds,
        new StandardFormEquationNode(),
        new Text( 'under construction' )
      )
    ];

    sceneNodes.forEach( function( sceneNode ) {
      self.addChild( sceneNode );
    } );

    // Get the bounds of the control panels
    var controlsParent = sceneNodes[ 0 ].controlsParent;

    // Center the scene control in the space below the Snapshots accordion box
    var sceneControl = new SceneControl( model.sceneProperty, model.scenes, {
      centerX: controlsParent.centerX,
      centerY: controlsParent.bottom + 100
    } );
    this.addChild( sceneControl );

    // Make the selected scene visible. unlink not needed.
    model.sceneProperty.link( function( scene ) {
      for ( var i = 0; i < sceneNodes.length; i++ ) {
        sceneNodes[ i ].visible = ( sceneNodes[ i ].scene === scene );
      }
    } );
  }

  graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );

  return inherit( GQScreenView, StandardFormScreenView );
} );
