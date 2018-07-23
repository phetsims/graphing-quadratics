// Copyright 2018, University of Colorado Boulder

/**
 * Common model (base type) for Graphing Quadratics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );

  /**
   * @param {GQScene[]} scenes
   * @constructor
   */
  function GQModel( scenes ) {

    // @public {GQScene[]} scenes, in the order that they appear from left-to-right as radio buttons
    this.scenes = scenes;

    // @public {Property.<Scene>} the selected scene
    this.sceneProperty = new Property( scenes[ 0 ], {
      validValues: scenes
    } );
  }

  graphingQuadratics.register( 'GQModel', GQModel );

  return inherit( Object, GQModel, {

    /**
     * Resets this model by resetting each of its scenes
     *
     * @public
     */
    reset: function() {
      this.scenes.forEach( function( scene ) { scene.reset(); } );
      this.sceneProperty.reset();
    }
  } );
} );
