// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  var VertexFormScreenView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormScreenView' );

  // strings
  var screenVertexFormString = require( 'string!GRAPHING_QUADRATICS/screen.vertexForm' );

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
