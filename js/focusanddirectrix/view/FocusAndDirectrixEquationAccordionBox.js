// Copyright 2018-2019, University of Colorado Boulder

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
  const merge = require( 'PHET_CORE/merge' );
  const Tandem = require( 'TANDEM/Tandem' );

  class FocusAndDirectrixEquationAccordionBox extends GQEquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = merge( {

        // phet-io
        tandem: Tandem.REQUIRED,
        phetioDocumentation: 'accordion box that contains the interactive equation'

      }, options );

      assert && assert( !options.titleNode, 'FocusAndDirectrixEquationAccordionBox sets titleNode' );
      options.titleNode = new FocusAndDirectrixEquationNode( {
        maxWidth: 225, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the equation shown at the top of this accordion box'
      } );

      const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
        model.pProperty, model.hProperty, model.kProperty, {
          tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
          phetioDocumentation: 'the interactive equation in this accordion box'
        } );

      super( model, interactiveEquationNode, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixEquationAccordionBox', FocusAndDirectrixEquationAccordionBox );
} );