// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for general equation in standard form.
 * Standard form is y = ax^2 + bx + c
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const bString = require( 'string!GRAPHING_QUADRATICS/b' );
  const cString = require( 'string!GRAPHING_QUADRATICS/c' );
  const xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  class StandardFormEquationNode extends RichText {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        font: GQFont.MATH_SYMBOL_FONT
      } );

      const equation = StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}} {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
        xSquared: xSquaredString,
        x: xString,
        y: yString,
        a: aString,
        b: bString,
        c: cString,
        equals: MathSymbols.EQUAL_TO,
        plus: MathSymbols.PLUS
      } );

      super( equation, options );

    }
  }

  return graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );
} );
