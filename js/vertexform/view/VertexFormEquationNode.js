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
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const hString = require( 'string!GRAPHING_QUADRATICS/h' );
  const kString = require( 'string!GRAPHING_QUADRATICS/k' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

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
