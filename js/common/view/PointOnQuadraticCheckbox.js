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
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const pointOnQuadraticString = require( 'string!GRAPHING_QUADRATICS/pointOnQuadratic' );

  class PointOnQuadraticCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} pointOnQuadraticVisibleProperty
     * @param {Object} [options]
     */
    constructor( pointOnQuadraticVisibleProperty, options ) {

      const label = new HBox( {
        align: 'center',
        spacing: 4,
        children: [

          // text
          new Text( pointOnQuadraticString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
          } ),

          // interactive point
          new Manipulator( 8, GQColors.POINT_ON_QUADRATIC, { pickable: false } )
        ]
      } );

      super( label, pointOnQuadraticVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'PointOnQuadraticCheckbox', PointOnQuadraticCheckbox );
} );