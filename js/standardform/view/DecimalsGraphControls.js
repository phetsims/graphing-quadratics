// Copyright 2018, University of Colorado Boulder

/**
 * Decimals scene controls for various features related to the graph.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Panel = require( 'SUN/Panel' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const TEXT_OPTIONS = { font: GQFont.SMALLER_MATH_SYMBOL_FONT };

  // strings
  const aString = require( 'string!GRAPHING_QUADRATICS/a' );
  const bString = require( 'string!GRAPHING_QUADRATICS/b' );
  const cString = require( 'string!GRAPHING_QUADRATICS/c' );
  const xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  const xString = require( 'string!GRAPHING_QUADRATICS/x' );
  const yString = require( 'string!GRAPHING_QUADRATICS/y' );

  class DecimalsGraphControls extends Panel {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {BooleanProperty} linearTermVisibleProperty
     * @param {BooleanProperty} constantTermVisibleProperty
     * @param {Object} [options]
     * @constructor
     */
    constructor(
      quadraticTermVisibleProperty,
      linearTermVisibleProperty,
      constantTermVisibleProperty,
      options
    ) {

      options = _.extend( {
        fill: GQColors.CONTROL_PANEL_BACKGROUND,
        xMargin: 20,
        yMargin: 15
      }, options );

      const quadraticTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        xSquared: xSquaredString,
        y: yString,
        a: aString,
        equals: MathSymbols.EQUAL_TO
      } ), _.extend( {}, TEXT_OPTIONS, { fill: 'hotpink' } ) );

      const linearTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        x: xString,
        y: yString,
        b: bString,
        equals: MathSymbols.EQUAL_TO
      } ), _.extend( {}, TEXT_OPTIONS, { fill: 'green' } ) );

      const constantTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: yString,
        c: cString,
        equals: MathSymbols.EQUAL_TO
      } ), _.extend( {}, TEXT_OPTIONS, { fill: 'black' } ) );

      // checkboxes that control visibility
      const quadraticTermCheckbox = new Checkbox( quadraticTermEquation, quadraticTermVisibleProperty );
      const linearTermCheckbox = new Checkbox( linearTermEquation, linearTermVisibleProperty );
      const constantTermCheckbox = new Checkbox( constantTermEquation, constantTermVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        children: [
          quadraticTermCheckbox,
          linearTermCheckbox,
          constantTermCheckbox
        ],
        spacing: 20,
        align: 'left'
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'DecimalsGraphControls', DecimalsGraphControls );
} );