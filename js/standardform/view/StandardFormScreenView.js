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
  const StandardFormGraphControlPanel = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphControlPanel' );
  const StandardFormGraphNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormGraphNode' );
  const StandardFormViewProperties = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormViewProperties' );

  class StandardFormScreenView extends GQScreenView {

    /**
     * @param {StandardFormModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const options = {

        // phet-io
        tandem: tandem
      };

      const viewProperties = new StandardFormViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties' )
      } );

      super( model,
        viewProperties,
        new StandardFormGraphNode( model, viewProperties, tandem ),
        new StandardFormEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'accordion box that contains the interactive equation'
        } ),
        new StandardFormGraphControlPanel( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControlPanel' ),
          phetioDocumentation: 'panel that contains controls related to the graph',
          phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
} );
