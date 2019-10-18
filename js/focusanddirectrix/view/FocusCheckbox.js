// Copyright 2018-2019, University of Colorado Boulder

/**
 * 'Focus' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const merge = require( 'PHET_CORE/merge' );

  // strings
  const focusString = require( 'string!GRAPHING_QUADRATICS/focus' );

  class FocusCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} focusVisibleProperty
     * @param {Object} [options]
     */
    constructor( focusVisibleProperty, options ) {

      options = merge( {

        // phet-io
        phetioDocumentation: 'checkbox that shows the focus on the graph'

      }, options );

      // icon is a manipulator (3D sphere)
      assert && assert( !options.icon, 'FocusCheckbox sets icon' );
      options.icon = Manipulator.createIcon( 8, GQColors.FOCUS );

      super( focusString, focusVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'FocusCheckbox', FocusCheckbox );
} );