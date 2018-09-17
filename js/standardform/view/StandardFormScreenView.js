// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormAccordionBox = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormAccordionBox' );
  const StandardFormGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphControls' );

  class StandardFormScreenView extends GQScreenView {

    /**
     * @param {StandardFormModel} model
     */
    constructor( model ) {

      const viewProperties = new GQViewProperties();

      super( model,
        viewProperties,
        new StandardFormAccordionBox( model, viewProperties ),
        new StandardFormGraphControls( viewProperties ) );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
} );
