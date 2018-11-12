// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixEquationAccordionBox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixEquationAccordionBox' );
  const FocusAndDirectrixGraphControlPanel = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixGraphControlPanel' );
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

      const options = {

        // phet-io
        tandem: tandem
      };

      const viewProperties = new FocusAndDirectrixViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties' )
      } );

      super( model,
        viewProperties,
        new FocusAndDirectrixGraphNode( model, viewProperties, tandem ),
        new FocusAndDirectrixEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox' ),
          phetioDocumentation: 'accordion box that contains the interactive equation'
        } ),
        new FocusAndDirectrixGraphControlPanel( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControlPanel' ),
          phetioDocumentation: 'panel that contains controls related to the graph'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
} );
