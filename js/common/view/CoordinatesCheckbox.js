// Copyright 2018, University of Colorado Boulder

/**
 * 'Coordinates' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  // strings
  const coordinatesString = require( 'string!GRAPHING_QUADRATICS/coordinates' );

  class CoordinatesCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( coordinatesVisibleProperty, options ) {
      options = _.extend( {
        phetioDocumentation: 'checkbox that makes the (x,y) coordinates visible on points on the graph'
      }, options );
      super( coordinatesString, coordinatesVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'CoordinatesCheckbox', CoordinatesCheckbox );
} );