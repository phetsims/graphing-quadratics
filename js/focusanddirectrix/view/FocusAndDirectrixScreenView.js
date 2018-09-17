// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixAccordionBox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixAccordionBox' );
  const FocusAndDirectrixGraphControls = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixGraphControls' );
  const FocusAndDirectrixGraphNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixGraphNode' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class FocusAndDirectrixScreenView extends GQScreenView {

    /**
     * @param {FocusAndDirectrixModel} model
     */
    constructor( model ) {

      const viewProperties = new GQViewProperties( {
        vertexVisible: true,
        focusVisible: true,
        directrixVisible: true,
        pointOnQuadraticVisible: true
      } );

      super( model,
        viewProperties,
        new FocusAndDirectrixGraphNode( model, viewProperties ),
        new FocusAndDirectrixAccordionBox( model, viewProperties ),
        new FocusAndDirectrixGraphControls( viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
} );
