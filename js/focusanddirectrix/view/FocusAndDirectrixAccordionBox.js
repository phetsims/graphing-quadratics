// Copyright 2018, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_QUADRATICS/common/view/EquationAccordionBox' );
  const FocusAndDirectrixEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixEquationNode' );
  const FocusAndDirectrixInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixInteractiveEquationNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class FocusAndDirectrixAccordionBox extends EquationAccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      assert && assert( !options.titleNode, 'FocusAndDirectrixAccordionBox sets titleNode' );
      options.titleNode = new FocusAndDirectrixEquationNode( {
        maxWidth: 225, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' )
      } );

      const content = new FocusAndDirectrixInteractiveEquationNode( model.pProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'content' )
      } );

      super( model, content, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixAccordionBox', FocusAndDirectrixAccordionBox );
} );