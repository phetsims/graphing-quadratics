// Copyright 2018-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * View-specific Properties and properties for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class VertexFormViewProperties extends GQViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // {string} form of equations used to label curves on the graph, see GQConstants.EQUATION_FORMS
      equationForm: 'vertex',

      // {boolean} values for optional BooleanProperties
      vertexVisible: true,
      axisOfSymmetryVisible: false,
      coordinatesVisible: true,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( options );
  }
}

graphingQuadratics.register( 'VertexFormViewProperties', VertexFormViewProperties );