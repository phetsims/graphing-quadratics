// Copyright 2018, University of Colorado Boulder

/**
 * Decimals scene controls for various features related to the graph.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Checkbox = require( 'SUN/Checkbox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var GQFont = require( 'GRAPHING_QUADRATICS/common/GQFont' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // constants
  var TEXT_OPTIONS = { font: GQFont.SMALLER_MATH_SYMBOL_FONT };

  // strings
  var xSquaredString = require( 'string!GRAPHING_QUADRATICS/xSquared' );
  var xString = require( 'string!GRAPHING_QUADRATICS/x' );
  var yString = require( 'string!GRAPHING_QUADRATICS/y' );
  var aString = require( 'string!GRAPHING_QUADRATICS/a' );
  var bString = require( 'string!GRAPHING_QUADRATICS/b' );
  var cString = require( 'string!GRAPHING_QUADRATICS/c' );

  /**
   * @param {BooleanProperty} quadraticTermVisibleProperty
   * @param {BooleanProperty} linearTermVisibleProperty
   * @param {BooleanProperty} constantTermVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function DecimalsGraphControls(
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

    var quadraticTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
      xSquared: xSquaredString,
      y: yString,
      a: aString,
      equals: MathSymbols.EQUAL_TO
    } ), _.extend( {}, TEXT_OPTIONS, { fill: 'hotpink' } ) );

    var linearTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
      x: xString,
      y: yString,
      b: bString,
      equals: MathSymbols.EQUAL_TO
    } ), _.extend( {}, TEXT_OPTIONS, { fill: 'green' } ) );

    var constantTermEquation = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
      y: yString,
      c: cString,
      equals: MathSymbols.EQUAL_TO
    } ), _.extend( {}, TEXT_OPTIONS, { fill: 'black' } ) );

    // checkboxes that control visibility
    var quadraticTermCheckbox = new Checkbox( quadraticTermEquation, quadraticTermVisibleProperty );
    var linearTermCheckbox = new Checkbox( linearTermEquation, linearTermVisibleProperty );
    var constantTermCheckbox = new Checkbox( constantTermEquation, constantTermVisibleProperty );

    // vertical layout
    var contentNode = new VBox( {
      children: [
        quadraticTermCheckbox,
        linearTermCheckbox,
        constantTermCheckbox
      ],
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentNode, options );
  }

  graphingQuadratics.register( 'DecimalsGraphControls', DecimalsGraphControls );

  return inherit( Panel, DecimalsGraphControls );
} );