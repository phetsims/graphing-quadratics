// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for y = (1/(4p)(x - h)^2 + k
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  class FocusAndDirectrixEquationNode extends RichText {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // {string|number}
        h: GQSymbols.h,
        p: GQSymbols.p,
        k: GQSymbols.k,

        // superclass options
        font: new PhetFont( 26 ),
        fill: 'black'
      } );

      const equation = StringUtils.fillIn(
        '{{y}} {{equals}} 1/4{{p}} ({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
          y: GQSymbols.y,
          equals: MathSymbols.EQUAL_TO,
          p: GQSymbols.p,
          x: GQSymbols.x,
          minus: MathSymbols.MINUS,
          h: GQSymbols.h,
          plus: MathSymbols.PLUS,
          k: GQSymbols.k
        } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixEquationNode', FocusAndDirectrixEquationNode );
} );
