// Copyright 2014-2018, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQScreenIconFactory = require( 'GRAPHING_QUADRATICS/common/view/GQScreenIconFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const VertexFormModel = require( 'GRAPHING_QUADRATICS/vertexform/model/VertexFormModel' );
  const VertexFormScreenView = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormScreenView' );

  // strings
  const screenVertexFormString = require( 'string!GRAPHING_QUADRATICS/screen.vertexForm' );

  class VertexFormScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {

        // Screen options
        name: screenVertexFormString,
        backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
        homeScreenIcon: GQScreenIconFactory.createVertexFormScreenIcon(),
        tandem: tandem
      };

      super(
        () => new VertexFormModel( tandem.createTandem( 'model' ) ),
        model => new VertexFormScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'VertexFormScreen', VertexFormScreen );
} );
