// Copyright 2018, University of Colorado Boulder

/**
 * Static equation in vertex form: y = a(x - h)^2 + k
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormEquationNode extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // phet-io
        tandem: Tandem.required
      }, options );

      // y = a(x - h)^2 + k
      const text = StringUtils.fillIn( '{{y}} {{equals}} {{a}}({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
        x: GQSymbols.x,
        y: GQSymbols.y,
        a: GQSymbols.a,
        h: GQSymbols.h,
        k: GQSymbols.k,
        equals: MathSymbols.EQUAL_TO,
        minus: MathSymbols.MINUS,
        plus: MathSymbols.PLUS
      } );

      const textNode = new RichText( text, {
        font: GQConstants.INTERACTIVE_EQUATION_FONT,
        fill: 'black'
      } );

      // Wrap the RichText so that its API is not accessible to clients or PhET-iO.
      assert && assert( !options.children, 'VertexFormEquationNode sets children' );
      options.children = [ textNode ];

      super( options );
    }
  }

  return graphingQuadratics.register( 'VertexFormEquationNode', VertexFormEquationNode );
} );
