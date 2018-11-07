// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // {string} form of equations used to label curves on the graph, see GQConstants.EQUATION_FORMS
        equationForm: 'vertex',

        // {boolean} values for optional BooleanProperties
        vertexVisible: true,
        axisOfSymmetryVisible: false,
        coordinatesVisible: true,

        // phet-io
        tandem: Tandem.required
      }, options );

      super( options );
    }
  }

  return graphingQuadratics.register( 'VertexFormViewProperties', VertexFormViewProperties );
} );

 