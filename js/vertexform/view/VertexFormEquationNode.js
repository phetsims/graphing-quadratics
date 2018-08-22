// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for general equation in vertex form.
 * Vertex form is y = a(x - h)^2 + k
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

  class VertexFormEquationNode extends RichText {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // {string|number} defaults display the general form y = a(x - h)^2 + k
        a: GQSymbols.a,
        h: GQSymbols.h,
        k: GQSymbols.k,

        // superclass options
        font: new PhetFont( 26 ),
        fill: 'black'
      } );

      const equation = StringUtils.fillIn( '{{y}} {{equals}} {{a}}({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
        x: GQSymbols.x,
        y: GQSymbols.y,
        a: options.a,
        h: options.h,
        k: options.k,
        equals: MathSymbols.EQUAL_TO,
        minus: MathSymbols.MINUS,
        plus: MathSymbols.PLUS
      } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormEquationNode', VertexFormEquationNode );
} );
