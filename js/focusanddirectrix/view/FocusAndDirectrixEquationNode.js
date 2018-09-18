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

        // RichText options
        font: new PhetFont( 26 ),
        fill: 'black'
      } );

      const equation = StringUtils.fillIn(
        '{{y}} {{equals}} 1/4{{p}} ({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
          x: GQSymbols.x,
          y: GQSymbols.y,
          h: GQSymbols.h,
          k: GQSymbols.k,
          p: GQSymbols.p,
          equals: MathSymbols.EQUAL_TO,
          plus: MathSymbols.PLUS,
          minus: MathSymbols.MINUS
        } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixEquationNode', FocusAndDirectrixEquationNode );
} );
