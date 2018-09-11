// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixSceneNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixSceneNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class FocusAndDirectrixScreenView extends GQScreenView {

    /**
     * @param {FocusAndDirectrixModel} model
     */
    constructor( model ) {

      //TODO this pattern of passing view Properties to superclass is awkward
      const viewProperties = new GQViewProperties( {
        focusVisible: true,
        directrixVisible: true,
        pointOnQuadraticVisible: true
      } );
      super( model, [ viewProperties ] );
      this.addChild( new FocusAndDirectrixSceneNode( model.scene, this.layoutBounds, viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
} );
