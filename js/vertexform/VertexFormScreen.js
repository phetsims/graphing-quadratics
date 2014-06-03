// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  var VertexFormView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormView' );

  // strings
  var screenTitle = require( 'string!GRAPHING_QUADRATICS/vertexForm' );

  var createIcon = function() {
     return new Rectangle( 0, 0, 100, 100, { fill: 'green' } ); //TODO
  };

  function VertexFormScreen() {
      Screen.call( this,
        screenTitle,
        createIcon(),
        function() { return new VertexFormModel(); },
        function( model ) { return new VertexFormView( model, ModelViewTransform2.createIdentity() ); },
        { backgroundColor: GQColors.SCREEN_BACKGROUND }
      );
    }

    return inherit( Screen, VertexFormScreen );
} );
