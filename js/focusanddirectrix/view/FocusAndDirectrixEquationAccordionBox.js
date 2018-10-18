// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FocusAndDirectrixEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixEquationNode' );
  const FocusAndDirectrixInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixInteractiveEquationNode' );
  const GQEquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/GQEquationAccordionBox' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class FocusAndDirectrixEquationAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'FocusAndDirectrixEquationAccordionBox sets titleNode' );
      options.titleNode = new FocusAndDirectrixEquationNode( {
        maxWidth: 225, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the equation shown at the top of this accordion box'
      } );

      const content = new FocusAndDirectrixInteractiveEquationNode( model.pProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'content' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixEquationAccordionBox', FocusAndDirectrixEquationAccordionBox );
} );