// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox to show/hide roots of the quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );

  // constants
  const POINT_RADIUS = 6;

  class RootsCheckbox extends Checkbox {

    constructor( rootsVisibleProperty, options ) {

      const label = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( rootsString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
          } ),
          new HBox( {
            align: 'center',
            spacing: 5,
            children: [
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS ),
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS )
            ]
          } )
        ]
      } );

      super( label, rootsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'RootsCheckbox', RootsCheckbox );
} );