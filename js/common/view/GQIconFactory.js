// Copyright 2018, University of Colorado Boulder

//TODO #11 design screen icons
/**
 * Creates icons for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Range = require( 'DOT/Range' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );
  const Shape = require( 'KITE/Shape' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  const GQIconFactory = {

    /**
     * Creates the icon for the Explore screen.
     * @returns {Node}
     */
    createExploreScreenIcon() {

      const quadratic = new Quadratic( -0.05, 0, 0, {
        color: GQColors.EXPLORE_INTERACTIVE_CURVE
      } );

      const bezierControlPoints = quadratic.getControlPoints( new Range( -50, 50 ) );

      const quadraticNode = new Path( new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint ), {
        lineWidth: 5,
        stroke: quadratic.color
      } );

      return new ScreenIcon( quadraticNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.7
      } );
    },

    /**
     * Creates the icon for the Standard Form screen.
     * @returns {Node}
     */
    createStandardFormScreenIcon() {

      const font = new PhetFont( { size: 40, weight: 'bold' } );

      const aNode = new RichText( GQSymbols.a, {
        font: font,
        fill: GQColors.STANDARD_FORM_A
      } );

      const bNode = new RichText( GQSymbols.b, {
        font: font,
        fill: GQColors.STANDARD_FORM_B
      } );

      const cNode = new RichText( GQSymbols.c, {
        font: font,
        fill: GQColors.STANDARD_FORM_C
      } );

      const iconNode = new HBox( {
        spacing: 12,
        children: [ aNode, bNode, cNode ]
      } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.7
      } );
    },

    /**
     * Creates the icon for the Vertex Form screen.
     * @returns {Node}
     */
    createVertexFormScreenIcon() {

      const font = new PhetFont( { size: 40, weight: 'bold' } );

      const aNode = new RichText( GQSymbols.a, {
        font: font,
        fill: GQColors.VERTEX_FORM_A
      } );

      const hNode = new RichText( GQSymbols.h, {
        font: font,
        fill: GQColors.VERTEX_FORM_H
      } );

      const kNode = new RichText( GQSymbols.k, {
        font: font,
        fill: GQColors.VERTEX_FORM_K
      } );

      const iconNode = new HBox( {
        spacing: 8,
        children: [ aNode, hNode, kNode ]
      } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.7
      } );
    },

    /**
     * Creates the icon for the Focus & Directrix screen.
     * @returns {Node}
     */
    createFocusAndDirectrixScreenIcon() {

      const focusNode = new Manipulator( 12, GQColors.FOCUS, {
        haloAlpha: 0,
        pickable: false
      } );

      const directrixNode = new Line( 0, 0, 60, 0, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: 4,
        lineDash: GQConstants.DIRECTRIX_LINE_DASH
      } );

      const iconNode = new VBox( {
        children: [ focusNode, directrixNode ],
        spacing: 20
      } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.7,
        maxIconHeightProportion: 0.5
      } );
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );