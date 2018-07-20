// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for general equation in vertex form.
 * Vertex form is y = a(x - h)^2 + k
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
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );
  var aString = require( 'string!GRAPHING_QUADRATICS/a' );
  var hString = require( 'string!GRAPHING_QUADRATICS/h' );
  var kString = require( 'string!GRAPHING_QUADRATICS/k' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function VertexFormEquationNode( options ) {

    options = _.extend( {
      font: GQFont.MATH_SYMBOL_FONT
    } );

    var equation = StringUtils.fillIn( '{{y}} {{equals}} {{a}}({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
      x: xString,
      y: yString,
      a: aString,
      h: hString,
      k: kString,
      equals: MathSymbols.EQUAL_TO,
      minus: MathSymbols.MINUS,
      plus: MathSymbols.PLUS
    } );

    RichText.call( this, equation, options );

  }

  graphingQuadratics.register( 'VertexFormEquationNode', VertexFormEquationNode );

  return inherit( RichText, VertexFormEquationNode );
} );
