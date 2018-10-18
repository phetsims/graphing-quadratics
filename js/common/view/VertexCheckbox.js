// Copyright 2018, University of Colorado Boulder

/**
 * 'Vertex' checkbox.  The vertex icon can be displayed as either a manipulator or a flat circle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQCheckbox = require( 'GRAPHING_QUADRATICS/common/view/GQCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );

  // strings
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  class VertexCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {Object} [options]
     */
    constructor( vertexVisibleProperty, options ) {

      options = _.extend( {
        manipulatorIcon: true // true: icon is a shaded manipulator, false: icon is a flat point
      }, options );

      // phetioDocumentation that is appropriate for icon type
      if ( options.phetioDocumentation === undefined ) {
        if ( options.manipulatorIcon ) {
          options.phetioDocumentation ='checkbox that shows the vertex manipulator on the graph';
        }
        else {
          options.phetioDocumentation ='checkbox that shows the vertex on the graph';
        }
      }

      // icon is either a manipulator (3D sphere) or a flat circle
      assert && assert( !options.icon, 'VertexCheckbox sets icon' );
      options.icon = ( options.manipulatorIcon ) ?
                   new Manipulator( 8, GQColors.VERTEX, { haloAlpha: 0, pickable: false } ) :
                   new Circle( 6, { fill: GQColors.VERTEX } );

      super( vertexString, vertexVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );
} );