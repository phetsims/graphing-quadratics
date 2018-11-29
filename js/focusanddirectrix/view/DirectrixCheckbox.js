// Copyright 2018, University of Colorado Boulder

/**
 * 'Directrix' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );

  // strings
  const directrixString = require( 'string!GRAPHING_QUADRATICS/directrix' );

  class DirectrixCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {Object} [options]
     */
    constructor( directrixVisibleProperty, options ) {

      options = _.extend( {

        // phet-io
        phetioDocumentation: 'checkbox that shows the directrix on the graph'

      }, options );

      // icon is a horizontal dashed line
      assert && assert( !options.icon, 'DirectrixCheckbox sets icon' );
      options.icon = new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[ 0 ], 0, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
        lineDash: GQConstants.DIRECTRIX_LINE_DASH
      } );

      super( directrixString, directrixVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'DirectrixCheckbox', DirectrixCheckbox );
} );