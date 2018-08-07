// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DecimalsGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsGraphControls' );
  const DecimalsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsInteractiveEquationNode' );
  const GQSceneNode = require( 'GRAPHING_QUADRATICS/common/view/GQSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const IntegersGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersGraphControls' );
  const IntegersInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersInteractiveEquationNode' );
  const SceneControl = require( 'GRAPHING_QUADRATICS/standardform/view/SceneControl' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );

  class StandardFormScreenView extends GQScreenView {

    /**
     * @param {StandardFormModel} model
     */
    constructor( model ) {

      const integersViewProperties = new GQViewProperties();

      const decimalsViewProperties = new GQViewProperties();

      super( model, [ integersViewProperties, decimalsViewProperties ] );

      // view for the integers scene
      const integersSceneNode = new GQSceneNode(
        model.integersScene,
        this.layoutBounds,
        new StandardFormEquationNode(),
        new IntegersInteractiveEquationNode(
          model.integersScene.quadraticProperty,
          model.integersScene.aRange,
          model.integersScene.bRange,
          model.integersScene.cRange
        ),
        new IntegersGraphControls(
          integersViewProperties.vertexVisibleProperty,
          integersViewProperties.axisOfSymmetryVisibleProperty,
          integersViewProperties.rootsVisibleProperty,
          integersViewProperties.hideCurvesProperty
        ),
        integersViewProperties
      );

      // view for the decimals scene
      const decimalsSceneNode = new GQSceneNode(
        model.decimalsScene,
        this.layoutBounds,
        new StandardFormEquationNode(),
        new DecimalsInteractiveEquationNode(
          model.decimalsScene.quadraticProperty,
          model.decimalsScene.aRange,
          model.decimalsScene.bRange,
          model.decimalsScene.cRange
        ),
        new DecimalsGraphControls(
          decimalsViewProperties.quadraticTermVisibleProperty,
          decimalsViewProperties.linearTermVisibleProperty,
          decimalsViewProperties.constantTermVisibleProperty,
          decimalsViewProperties.hideCurvesProperty
        ),
        decimalsViewProperties
      );

      // managing the scene nodes
      const sceneNodes = [ integersSceneNode, decimalsSceneNode ];

      sceneNodes.forEach( sceneNode => { this.addChild( sceneNode ); } );

      // Get the bounds of the control panels
      const controlsParent = sceneNodes[ 0 ].controlsParent;

      // Center the scene control in the space below the Snapshots accordion box
      const sceneControl = new SceneControl( model.sceneProperty, model.scenes, {
        centerX: controlsParent.centerX,
        bottom: this.resetAllButton.bottom,
        buttonContentYMargin: 0
      } );
      this.addChild( sceneControl );

      // Make the selected scene visible. unlink not needed, as scenes last for the entire life of the sim.
      model.sceneProperty.link( function( scene ) {
        for ( let i = 0; i < sceneNodes.length; i++ ) {
          sceneNodes[ i ].visible = ( sceneNodes[ i ].scene === scene );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
} );
