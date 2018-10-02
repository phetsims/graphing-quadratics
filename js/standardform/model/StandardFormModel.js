// Copyright 2014-2018, University of Colorado Boulder

/**
 * Model for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ExploreModel = require( 'GRAPHING_QUADRATICS/explore/model/ExploreModel' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class StandardFormModel extends ExploreModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {
      super( tandem );
    }
  }

  return graphingQuadratics.register( 'StandardFormModel', StandardFormModel );
} );
