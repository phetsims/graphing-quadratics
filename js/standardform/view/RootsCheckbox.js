// Copyright 2018, University of Colorado Boulder

/**
 * 'Roots' checkbox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );

  // constants
  const POINT_RADIUS = 6;

  class RootsCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} rootsVisibleProperty
     * @param {Object} [options]
     */
    constructor( rootsVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const label = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( rootsString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
            maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
          } ),

          // icon
          new HBox( {
            align: 'center',
            spacing: 5,
            children: [
              new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } ),
              new Circle( POINT_RADIUS, { fill: GQColors.ROOTS } )
            ]
          } )
        ]
      } );

      super( label, rootsVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'RootsCheckbox', RootsCheckbox );
} );