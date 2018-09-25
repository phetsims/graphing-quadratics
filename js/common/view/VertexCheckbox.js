// Copyright 2018, University of Colorado Boulder

/**
 * 'Vertex' checkbox.
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
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  class VertexCheckbox extends Checkbox {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {Object} [options]
     */
    constructor( vertexVisibleProperty, options ) {

      options = _.extend( {
        manipulatorIcon: false
      }, options );

      const label = new HBox( {
        align: 'center',
        spacing: GQConstants.CHECKBOX_ICON_SPACING,
        children: [

          // text
          new Text( vertexString, {
            font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE )
          } ),

          // icon
          ( options.manipulatorIcon ) ?
          new Manipulator( 8, GQColors.VERTEX, { haloAlpha: 0, pickable: false } ) :
          new Circle( 6, { fill: GQColors.VERTEX } )
        ]
      } );

      super( label, vertexVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );
} );