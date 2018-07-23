// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SceneControl = require( 'GRAPHING_QUADRATICS/standardform/view/SceneControl' );
  const IntegersGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersGraphControls' );
  const DecimalsGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsGraphControls' );
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const IntegersInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersInteractiveEquationNode' );
  const DecimalsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsInteractiveEquationNode' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );

  /**
   * @param {StandardFormModel} model
   * @constructor
   */
  function StandardFormScreenView( model ) {
    var self = this;

    var integersViewProperties = new LineFormsViewProperties();

    var decimalsViewProperties = new LineFormsViewProperties();

    GQScreenView.call( this, model, [ integersViewProperties, decimalsViewProperties ] );

    // view for the integers scene
    var integersInteractiveEquationNode = new IntegersInteractiveEquationNode(
      model.integersScene.aProperty,
      model.integersScene.bProperty,
      model.integersScene.cProperty
    );

    var integersSceneNode = new GQSceneNode(
      model.integersScene,
      this.layoutBounds,
      new StandardFormEquationNode(),
      integersInteractiveEquationNode,
      new IntegersGraphControls(
        integersViewProperties.vertexVisibleProperty,
        integersViewProperties.axisOfSymmetryVisibleProperty,
        integersViewProperties.rootsVisibleProperty
      ),
      integersViewProperties
    );

    // view for the decimals scene
    var decimalsInteractiveEquationNode = new DecimalsInteractiveEquationNode(
      model.decimalsScene.aProperty,
      model.decimalsScene.bProperty,
      model.decimalsScene.cProperty
    );

    var decimalsSceneNode = new GQSceneNode(
      model.decimalsScene,
      this.layoutBounds,
      new StandardFormEquationNode(),
      decimalsInteractiveEquationNode,
      new DecimalsGraphControls(
        decimalsViewProperties.quadraticTermVisibleProperty,
        decimalsViewProperties.linearTermVisibleProperty,
        decimalsViewProperties.constantTermVisibleProperty
      ),
      decimalsViewProperties
    );

    // managing the scene nodes
    var sceneNodes = [ integersSceneNode, decimalsSceneNode ];

    sceneNodes.forEach( function( sceneNode ) {
      self.addChild( sceneNode );
    } );

    // Get the bounds of the control panels
    var controlsParent = sceneNodes[ 0 ].controlsParent;

    // Center the scene control in the space below the Snapshots accordion box
    var sceneControl = new SceneControl( model.sceneProperty, model.scenes, {
      centerX: controlsParent.centerX,
      bottom: this.resetAllButton.bottom
    } );
    this.addChild( sceneControl );

    // Make the selected scene visible. unlink not needed, as scenes last for the entire life of the sim.
    model.sceneProperty.link( function( scene ) {
      for ( var i = 0; i < sceneNodes.length; i++ ) {
        sceneNodes[ i ].visible = ( sceneNodes[ i ].scene === scene );
      }
    } );
  }

  graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );

  return inherit( GQScreenView, StandardFormScreenView );
} );
