// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQModel = require( 'GRAPHING_QUADRATICS/common/model/GQModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const FocusAndDirectrixScene = require( 'GRAPHING_QUADRATICS/focusanddirectrix/model/FocusAndDirectrixScene' );

  class FocusAndDirectrixModel extends GQModel {

    constructor() {
      const scene = new FocusAndDirectrixScene();
      super( [ scene ] );
      this.scene = scene; // @public (read-only)
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixModel', FocusAndDirectrixModel );
} );
