// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SceneControl = require( 'GRAPHING_QUADRATICS/standardform/view/SceneControl' );
  var EquationControls = require( 'GRAPHING_QUADRATICS/common/view/EquationControls' );
  var IntegersGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersGraphControls' );
  var DecimalsGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsGraphControls' );
  var GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  var IntegersInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersInteractiveEquationNode' );
  var StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );

  /**
   * @param {StandardFormModel} model
   * @constructor
   */
  function StandardFormScreenView( model ) {
    var self = this;

    GQScreenView.call( this, model );

    // view of the general form equation, common to both scenes
    var equationNode = new StandardFormEquationNode();

    // view for the integers scene
    var integersInteractiveEquationNode = new IntegersInteractiveEquationNode(
      model.integersScene.aProperty,
      model.integersScene.bProperty,
      model.integersScene.cProperty
    );

    var integersViewProperties = new LineFormsViewProperties();

    var integersSceneNode = new GQSceneNode(
      model.integersScene,
      this.layoutBounds,
      new EquationControls( equationNode, integersInteractiveEquationNode ),
      new IntegersGraphControls(
        integersViewProperties.vertexVisibleProperty,
        integersViewProperties.axisOfSymmetryVisibleProperty,
        integersViewProperties.rootsVisibleProperty
      ),
      integersViewProperties
    );

    // view for the decimals scene
    var decimalsInteractiveEquationNode = new Text( 'under construction' );

    var decimalsViewProperties = new LineFormsViewProperties();

    var decimalsSceneNode = new GQSceneNode(
      model.decimalsScene,
      this.layoutBounds,
      new EquationControls( equationNode, decimalsInteractiveEquationNode ),
      new DecimalsGraphControls(),
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
      centerY: controlsParent.bottom + 100
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
