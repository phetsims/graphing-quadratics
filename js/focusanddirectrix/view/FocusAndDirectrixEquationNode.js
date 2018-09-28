// Copyright 2018, University of Colorado Boulder

/**
 * Static equation in the form: y = (1/(4p)(x - h)^2 + k
 * This is an alternative version of the vertex form, when 1/(4p) is substituted for a.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixEquationNode extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        font: new PhetFont( 26 ),
        fractionFont: new PhetFont( 22 ),
        color: 'black',
        tandem: Tandem.required
      } );

      // y =
      const leftString = StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } );
      const leftNode = new RichText( leftString, {
        font: options.font,
        fill: options.color
      } );

      // 1
      const numeratorNode = new RichText( '1', {
        font: options.fractionFont,
        fill: options.color
      } );

      // 4p
      const denominatorString = StringUtils.fillIn( '4{{p}}', {
        p: GQSymbols.p
      } );
      const denominatorNode = new RichText( denominatorString, {
        font: options.fractionFont,
        fill: options.color
      } );

      // horizontal line between numerator and denominator
      const fractionLineLength = 1.25 * Math.max( numeratorNode.width, denominatorNode.width );
      const fractionLine = new Line( 0, 0, fractionLineLength, 0, {
        stroke: options.color,
        lineWidth: 1
      } );

      // 1/4p
      const fractionNode = new VBox( {
        spacing: 2,
        children: [ numeratorNode, fractionLine, denominatorNode ]
      } );

      // (x - h)^2 + k
      const rightString = StringUtils.fillIn( '({{x}} {{minus}} {{h}})<sup>2</sup> {{plus}} {{k}}', {
        x: GQSymbols.x,
        h: GQSymbols.h,
        k: GQSymbols.k,
        plus: MathSymbols.PLUS,
        minus: MathSymbols.MINUS
      } );
      const rightNode = new RichText( rightString, {
        font: options.font,
        fill: options.color
      } );

      assert && assert( !options.children, 'FocusAndDirectrixEquationNode sets children' );
      options.children = [ leftNode, fractionNode, rightNode ];

      const xSpacing = 5;
      fractionNode.left = leftNode.right + xSpacing;
      fractionNode.centerY = leftNode.centerY;
      rightNode.left = fractionNode.right + xSpacing;

      super( options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixEquationNode', FocusAndDirectrixEquationNode );
} );
