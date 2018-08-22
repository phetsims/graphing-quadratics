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

        // {string|number} defaults display the general form y = ax^2 + bx + c
        a: GQSymbols.a,
        b: GQSymbols.b,
        c: GQSymbols.c,

        // superclass options
        font: new PhetFont( 26 ),
        fill: 'black'
      } );

      const equation = StringUtils.fillIn(
        '{{y}} {{equals}} {{a}}{{x}}<sup>2</sup> {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
          y: GQSymbols.y,
          equals: MathSymbols.EQUAL_TO,
          a: options.a,
          x: GQSymbols.x,
          plus: MathSymbols.PLUS,
          b: options.b,
          c: options.c
        } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );
} );
