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
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class VertexFormEquationNode extends RichText {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // RichText options
        font: new PhetFont( 26 ),
        fill: 'black',
        tandem: Tandem.required
      } );

      const equation = StringUtils.fillIn( '{{y}} {{equals}} {{a}}({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
        x: GQSymbols.x,
        y: GQSymbols.y,
        a: GQSymbols.a,
        h: GQSymbols.h,
        k: GQSymbols.k,
        equals: MathSymbols.EQUAL_TO,
        minus: MathSymbols.MINUS,
        plus: MathSymbols.PLUS
      } );

      super( equation, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormEquationNode', VertexFormEquationNode );
} );
