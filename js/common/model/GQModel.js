// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base type for model in Graphing Quadratics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );

  class GQModel {

    /**
     * @param {GQScene[]} scenes
     * @abstract
     */
    constructor( scenes ) {

      // @public {GQScene[]} scenes, in the order that they appear from left-to-right as radio buttons
      this.scenes = scenes;

      // @public {Property.<Scene>} the selected scene
      this.sceneProperty = new Property( scenes[ 0 ], {
        validValues: scenes
      } );
    }

    /**
     * Resets this model by resetting each of its scenes
     * @public
     */
    reset() {
      this.scenes.forEach( scene => {
        scene.reset();
      } );
      this.sceneProperty.reset();
    }
  }

  return graphingQuadratics.register( 'GQModel', GQModel );
} );
