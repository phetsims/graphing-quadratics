// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQScreenView = require( 'GRAPHING_QUADRATICS/common/view/GQScreenView' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormEquationAccordionBox = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationAccordionBox' );
  const StandardFormGraphControls = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphControls' );
  const StandardFormGraphNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphNode' );
  const StandardFormViewProperties = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormViewProperties' );

  class StandardFormScreenView extends GQScreenView {

    /**
     * @param {StandardFormModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const options = {
        tandem: tandem
      };

      const viewProperties = new StandardFormViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties' ),
        phetioDocumentation: 'Properties that are specific to the view for this screen'
      } );

      super( model,
        viewProperties,
        new StandardFormGraphNode( model, viewProperties, tandem ),
        new StandardFormEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'the accordion box that contains the interactive equation for this screen'
        } ),
        new StandardFormGraphControls( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControls' ),
          phetioDocumentation: 'the panel that contains the graph controls for this screen'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
} );
