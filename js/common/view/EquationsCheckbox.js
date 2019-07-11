// Copyright 2018-2019, University of Colorado Boulder

/**
 * 'Equations' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  // strings
  const equationsString = require( 'string!GRAPHING_QUADRATICS/equations' );

  class EquationsCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( equationsVisibleProperty, options ) {

      options = _.extend( {

        // phet-io
        phetioDocumentation: 'checkbox that shows equations on graphed curves'

      }, options );

      super( equationsString, equationsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'EquationsCheckbox', EquationsCheckbox );
} );