// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Decimals' scene of the 'Standard Form' screen.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const CHECKBOX_EQUATION_FONT = new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE );
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };

  // strings
  const hideCurvesString = require( 'string!GRAPHING_QUADRATICS/hideCurves' );

  class DecimalsGraphControls extends Panel {

    /**
     * @param {BooleanProperty} quadraticTermVisibleProperty
     * @param {BooleanProperty} linearTermVisibleProperty
     * @param {BooleanProperty} constantTermVisibleProperty
     * @param {BooleanProperty} hideCurvesProperty
     * @param {Object} [options]
     */
    constructor( quadraticTermVisibleProperty, linearTermVisibleProperty,
                 constantTermVisibleProperty, hideCurvesProperty, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // y = ax^2
      const quadraticTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        a: GQSymbols.a,
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.QUADRATIC_TERM
      } );
      const quadraticTermCheckbox = new Checkbox( quadraticTermLabel, quadraticTermVisibleProperty ); // dispose not needed

      // y = bx
      const linearTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.LINEAR_TERM
      } );
      const linearTermCheckbox = new Checkbox( linearTermLabel, linearTermVisibleProperty ); // dispose not needed

      // y = c
      const constantTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        c: GQSymbols.c
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.CONSTANT_TERM
      } );
      const constantTermCheckbox = new Checkbox( constantTermLabel, constantTermVisibleProperty ); // dispose not needed

      // Hide curves
      const hideCurvesLabel = new Text( hideCurvesString, CHECKBOX_LABEL_OPTIONS );
      const hideCurvesCheckbox = new Checkbox( hideCurvesLabel, hideCurvesProperty ); // dispose not needed

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          quadraticTermCheckbox,
          linearTermCheckbox,
          constantTermCheckbox,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'DecimalsGraphControls', DecimalsGraphControls );
} );