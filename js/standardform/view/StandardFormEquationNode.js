// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for general equation in standard form.
 * Standard form is y = ax^2 + bx + c
 *
 * @author Andrea Lin
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

  class StandardFormEquationNode extends RichText {

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
        '{{y}} {{equals}} {{a}}{{x}}<sup>2</sup> {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
          x: GQSymbols.x,
          y: GQSymbols.y,
          a: GQSymbols.a,
          b: GQSymbols.b,
          c: GQSymbols.c,
          equals: MathSymbols.EQUAL_TO,
          plus: MathSymbols.PLUS
        } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );
} );
