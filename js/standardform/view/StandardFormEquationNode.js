// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation.
 * General form is y = ax^2 + bx + c
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );

  // strings
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );
  var aString = require( 'string!GRAPHING_QUADRATICS/a' );
  var bString = require( 'string!GRAPHING_QUADRATICS/b' );
  var cString = require( 'string!GRAPHING_QUADRATICS/c' );

  /**
   * @constructor
   */
  function StandardFormEquationNode( options ) {

    options = _.extend( {
      font: GQFont.MATH_SYMBOL_FONT
    } );

    var equation = StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}} {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
      xSquared: xSquaredString,
      x: xString,
      y: yString,
      a: aString,
      b: bString,
      c: cString,
      equals: MathSymbols.EQUAL_TO,
      plus: MathSymbols.PLUS
    } );

    RichText.call( this, equation, options );

  }

  graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );

  return inherit( RichText, StandardFormEquationNode );
} );
