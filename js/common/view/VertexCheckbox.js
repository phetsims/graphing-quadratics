// Copyright 2018-2019, University of Colorado Boulder

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
  const merge = require( 'PHET_CORE/merge' );

  // strings
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  class VertexCheckbox extends GQCheckbox {

    /**
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {Object} [options]
     */
    constructor( vertexVisibleProperty, options ) {

      options = merge( {
        manipulatorIcon: true // true: icon is a shaded manipulator, false: icon is a flat point
      }, options );

      // icon is either a manipulator (3D sphere) or a flat circle
      assert && assert( !options.icon, 'VertexCheckbox sets icon' );
      if ( options.manipulatorIcon ) {
        options.icon = Manipulator.createIcon( 8, GQColors.VERTEX );
      }
      else {
        options.icon = new Circle( 6, { fill: GQColors.VERTEX } );
      }
      
      // phetioDocumentation that is appropriate for icon type
      if ( options.phetioDocumentation === undefined ) {
        if ( options.manipulatorIcon ) {
          options.phetioDocumentation = 'checkbox that shows the vertex manipulator on the graph';
        }
        else {
          options.phetioDocumentation = 'checkbox that shows the vertex on the graph';
        }
      }

      super( vertexString, vertexVisibleProperty, options );
    }
  }

  return graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );
} );