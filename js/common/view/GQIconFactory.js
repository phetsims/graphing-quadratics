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
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DirectrixNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/DirectrixNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const Range = require( 'DOT/Range' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );
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

      const quadraticNode = new QuadraticNode(
        new Property( quadratic ),
        new Range( -50, 50 ),
        new Range( -50, 50 ),
        ModelViewTransform2.createIdentity(),
        'standard',
        new BooleanProperty( false ), {
          lineWidth: 5
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

      const directrixNode = new DirectrixNode(
        new Property( new Quadratic( 1, 0, 0 ) ),
        new Range( -50, 50 ),
        new Range( -50, 50 ),
        ModelViewTransform2.createIdentity(),
        new BooleanProperty( true ),
        new BooleanProperty( false ) );

      const iconNode = new VBox( {
        children: [ focusNode, directrixNode ],
        spacing: 2
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