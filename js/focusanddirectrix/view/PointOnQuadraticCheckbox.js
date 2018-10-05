// Copyright 2018, University of Colorado Boulder

/**
 * 'Point on Quadratic' checkbox.
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
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const pointOnQuadraticString = require( 'string!GRAPHING_QUADRATICS/pointOnQuadratic' );

  class PointOnQuadraticCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} pointOnQuadraticVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointOnQuadraticVisibleProperty, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const content = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( pointOnQuadraticString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ),
            maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
          } ),

          // interactive point
          new Manipulator( 8, GQColors.POINT_ON_QUADRATIC, { haloAlpha: 0, pickable: false } )
        ]
      } );

      super( content, pointOnQuadraticVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'PointOnQuadraticCheckbox', PointOnQuadraticCheckbox );
} );