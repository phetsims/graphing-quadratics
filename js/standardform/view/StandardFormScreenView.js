// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DecimalsSceneNode = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const IntegersSceneNode = require( 'GRAPHING_QUADRATICS/standardform/view/IntegersSceneNode' );
  const SceneControl = require( 'GRAPHING_QUADRATICS/standardform/view/SceneControl' );

  class StandardFormScreenView extends GQScreenView {

    /**
     * @param {StandardFormModel} model
     */
    constructor( model ) {

      const integersViewProperties = new GQViewProperties();
      const decimalsViewProperties = new GQViewProperties();

      super( model, [ integersViewProperties, decimalsViewProperties ] );

      // Create nodes for the scenes
      const sceneNodes = [
        new IntegersSceneNode( model.integersScene, this.layoutBounds, integersViewProperties ),
        new DecimalsSceneNode( model.decimalsScene, this.layoutBounds, decimalsViewProperties )
      ];

      sceneNodes.forEach( sceneNode => { this.addChild( sceneNode ); } );

      //TODO this is a little smelly
      // Center the scene control below the scene-specific control panels
      const controlsParent = sceneNodes[ 0 ].controlsParent;
      const sceneControl = new SceneControl( model.sceneProperty, model.scenes, {
        centerX: controlsParent.centerX,
        bottom: this.resetAllButton.bottom,
        buttonContentYMargin: 0
      } );
      this.addChild( sceneControl );

      // Make the selected scene visible. unlink not needed.
      model.sceneProperty.link( scene => {
        for ( let i = 0; i < sceneNodes.length; i++ ) {
          sceneNodes[ i ].visible = ( sceneNodes[ i ].scene === scene );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
} );
