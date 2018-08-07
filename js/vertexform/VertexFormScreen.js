// Copyright 2014-2018, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  const VertexFormScreenView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormScreenView' );

  // strings
  const screenVertexFormString = require( 'string!GRAPHING_QUADRATICS/screen.vertexForm' );

  class VertexFormScreen extends Screen {

    constructor() {

      const options = {

        // superclass options
        name: screenVertexFormString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
        //TODO #11 homeScreenIcon:
      };

      super(
        function() { return new VertexFormModel(); },
        function( model ) { return new VertexFormScreenView( model ); },
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreen', VertexFormScreen );
} );
