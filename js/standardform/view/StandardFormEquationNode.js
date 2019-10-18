// Copyright 2018-2019, University of Colorado Boulder

/**
 * Static equation in standard form: y = ax^2 + bx + c
 * This is sometimes referred to as general form, typically in the context of conics.
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
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormEquationNode extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = merge( {

        // phet-io
        tandem: Tandem.required
      }, options );

      // y = ax^2 + bx + c
      const text = StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}} {{plus}} {{b}}{{x}} {{plus}} {{c}}', {
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared,
        y: GQSymbols.y,
        a: GQSymbols.a,
        b: GQSymbols.b,
        c: GQSymbols.c,
        equals: MathSymbols.EQUAL_TO,
        plus: MathSymbols.PLUS
      } );

      const textNode = new RichText( text, {
        font: GQConstants.INTERACTIVE_EQUATION_FONT,
        fill: 'black'
      } );

      // Wrap the RichText so that its API is not accessible to clients or PhET-iO.
      assert && assert( !options.children, 'StandardFormEquationNode sets children' );
      options.children = [ textNode ];

      super( options );
    }
  }

  return graphingQuadratics.register( 'StandardFormEquationNode', StandardFormEquationNode );
} );
