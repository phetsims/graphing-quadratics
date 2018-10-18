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

      const options = {
        tandem: tandem
      };

      const viewProperties = new FocusAndDirectrixViewProperties( {
        tandem: options.tandem.createTandem( 'viewProperties'),
        phetioDocumentation: 'Properties that are specific to the view for this screen'
      } );

      super( model,
        viewProperties,
        new FocusAndDirectrixGraphNode( model, viewProperties, tandem ), //TODO #71 move tandem to options, add phetioDocumentation
        new FocusAndDirectrixEquationAccordionBox( model, {
          expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
          tandem: options.tandem.createTandem( 'equationAccordionBox')
        } ),
        new FocusAndDirectrixGraphControls( viewProperties, {
          tandem: options.tandem.createTandem( 'graphControls' ),
          phetioDocumentation: 'the panel that contains the graph controls for this screen'
        } ),
        options
      );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
} );
