// Copyright 2014-2015, University of Colorado Boulder

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
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  var VertexFormScreenView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormScreenView' );

  // strings
  var vertexFormString = require( 'string!GRAPHING_QUADRATICS/vertexForm' );

  function VertexFormScreen() {

    var options = {
      name: vertexFormString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND )
    };

    Screen.call( this,
      function() { return new VertexFormModel(); },
      function( model ) { return new VertexFormScreenView( model, ModelViewTransform2.createIdentity() ); },
      options
    );
  }

  graphingQuadratics.register( 'VertexFormScreen', VertexFormScreen );

  return inherit( Screen, VertexFormScreen );
} );
