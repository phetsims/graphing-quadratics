// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HideCurvesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/HideCurvesCheckbox' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const rootsString = require( 'string!GRAPHING_QUADRATICS/roots' );
  const vertexString = require( 'string!GRAPHING_QUADRATICS/vertex' );

  // constants
  const CHECKBOX_EQUATION_FONT = new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE );
  const CHECKBOX_LABEL_OPTIONS = { font: new PhetFont( GQConstants.CHECKBOX_LABEL_FONT_SIZE ) };
  const POINT_RADIUS = 6;

  class StandardGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {}, GQConstants.PANEL_OPTIONS, options );

      // Axis of Symmetry, dispose not needed
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty );

      // Vertex, dispose not needed
      const vertexLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( vertexString, CHECKBOX_LABEL_OPTIONS ),
          new PlottedPointNode( POINT_RADIUS, GQColors.VERTEX )
        ]
      } );
      const vertexCheckbox = new Checkbox( vertexLabel, viewProperties.vertexVisibleProperty );

      // Roots, dispose not needed
      const rootsLabel = new HBox( {
        align: 'center',
        spacing: 10,
        children: [
          new Text( rootsString, CHECKBOX_LABEL_OPTIONS ),
          new HBox( {
            align: 'center',
            spacing: 5,
            children: [
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS ),
              new PlottedPointNode( POINT_RADIUS, GQColors.ROOTS )
            ]
          } )
        ]
      } );
      const rootsCheckbox = new Checkbox( rootsLabel, viewProperties.rootsVisibleProperty );

      // y = ax^2, dispose not needed
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
      const quadraticTermCheckbox = new Checkbox( quadraticTermLabel, viewProperties.quadraticTermVisibleProperty );

      // y = bx, dispose not needed
      const linearTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.LINEAR_TERM
      } );
      const linearTermCheckbox = new Checkbox( linearTermLabel, viewProperties.linearTermVisibleProperty );

      // y = c, dispose not needed
      const constantTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        c: GQSymbols.c
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.CONSTANT_TERM
      } );
      const constantTermCheckbox = new Checkbox( constantTermLabel, viewProperties.constantTermVisibleProperty );

      // horizontal layout of term checkboxes
      var termCheckboxes = new HBox( {
        spacing: 30,
        children: [ quadraticTermCheckbox, linearTermCheckbox, constantTermCheckbox ]
      } );

      // Hide curves, dispose not needed
      const hideCurvesCheckbox = new HideCurvesCheckbox( viewProperties.linesVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          axisOfSymmetryCheckbox,
          vertexCheckbox,
          rootsCheckbox,
          termCheckboxes,
          hideCurvesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'StandardGraphControls', StandardGraphControls );
} );