// Copyright 2014-2017, University of Colorado Boulder

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
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  const VertexFormScreenView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormScreenView' );

  // strings
  const screenVertexFormString = require( 'string!GRAPHING_QUADRATICS/screen.vertexForm' );

  function VertexFormScreen() {

    var options = {
      name: screenVertexFormString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
    };

    Screen.call( this,
      function() { return new VertexFormModel(); },
      function( model ) { return new VertexFormScreenView( model ); },
      options
    );
  }

  graphingQuadratics.register( 'VertexFormScreen', VertexFormScreen );

  return inherit( Screen, VertexFormScreen );
} );
