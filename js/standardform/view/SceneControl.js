// Copyright 2018, University of Colorado Boulder

/**
 * Control for selecting a scene.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  /**
   * @param {Property.<Scene>} selectedSceneProperty
   * @param {Scene[]} scenes
   * @param {Object} [options]
   * @constructor
   */
  function SceneControl( selectedSceneProperty, scenes, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 20,
      baseColor: 'white',
      selectedLineWidth: 2,
      buttonContentXMargin: 20,
      buttonContentYMargin: 8
    }, options );

    // touchArea optimized for spacing
    options.touchAreaXDilation = ( options.spacing / 2 ) - 1;
    options.touchAreaYDilation = 5;

    const content = [];
    scenes.forEach( function( scene ) {
      content.push( {
        value: scene,
        node: scene.icon
      } );
    } );

    RadioButtonGroup.call( this, selectedSceneProperty, content, options );
  }

  graphingQuadratics.register( 'SceneControl', SceneControl );

  return inherit( RadioButtonGroup, SceneControl );
} );
