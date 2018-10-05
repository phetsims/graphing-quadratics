// Copyright 2018, University of Colorado Boulder

/**
 * 'Vertex' checkbox.  The vertex icon can be displayed as either a point or a manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CheckboxWithTextAndIcon = require( 'GRAPHING_QUADRATICS/common/view/CheckboxWithTextAndIcon' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  class VertexCheckbox extends CheckboxWithTextAndIcon {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {Object} [options]
     */
    constructor( vertexVisibleProperty, options ) {

      options = _.extend( {
        manipulatorIcon: false,
        tandem: Tandem.required
      }, options );

      const icon = ( options.manipulatorIcon ) ?
                   new Manipulator( 8, GQColors.VERTEX, { haloAlpha: 0, pickable: false } ) :
                   new Circle( 6, { fill: GQColors.VERTEX } );

      super( vertexString, icon, vertexVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );
} );