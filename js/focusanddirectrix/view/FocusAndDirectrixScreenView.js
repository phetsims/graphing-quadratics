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
  const FocusAndDirectrixViewProperties = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixViewProperties' );
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );

  class FocusAndDirectrixScreenView extends GQScreenView {

    /**
     * @param {FocusAndDirectrixModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const viewProperties = new FocusAndDirectrixViewProperties( tandem.createTandem( 'viewProperties') );

      super( model,
        viewProperties,
        new FocusAndDirectrixGraphNode( model, viewProperties ),
        new FocusAndDirectrixAccordionBox( model, viewProperties.equationAccordionBoxExpandedProperty, tandem.createTandem( 'equationAccordionBox') ),
        new FocusAndDirectrixGraphControls( viewProperties, tandem.createTandem( 'graphControls' ) ),
        tandem
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
} );
