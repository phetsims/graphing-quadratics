// Copyright 2018, University of Colorado Boulder

//TODO #11 where possible, compute magic numbers herein for layout
/**
 * Creates icons for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Range = require( 'DOT/Range' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );
  const Shape = require( 'KITE/Shape' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VSeparator = require( 'SUN/VSeparator' );

  // coefficients for the quadratic curve used in every icon
  const A = 0.03;
  const B = 0;
  const C = 0;
  const POINT_RADIUS = 12;
  const MANIPULATOR_RADIUS = 12;

  const GQIconFactory = {

    /**
     * Creates the icon for the Explore screen.
     * @returns {Node}
     */
    createExploreScreenIcon() {

      const separator = new VSeparator( 20, { stroke: 'transparent' } );

      const quadratic = new Quadratic( A, B, C, { color: 'black' } );

      const bezierControlPoints = quadratic.getControlPoints( new Range( -50, 50 ) );

      const quadraticNode = new Path( new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint ), {
        lineWidth: 6,
        stroke: quadratic.color
      } );

      const iconNode = new VBox( { children: [ separator, quadraticNode ] } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconHeightProportion: 1 // fill the full height of the screen icon
      } );
    },

    /**
     * Creates the icon for the Standard Form screen.
     * @returns {Node}
     */
    createStandardFormScreenIcon() {

      const quadratic = new Quadratic( -A, B, C, { color: 'black' } );

      const bezierControlPoints = quadratic.getControlPoints( new Range( -50, 50 ) );

      const quadraticNode = new Path( new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint ), {
        lineWidth: 6,
        stroke: quadratic.color
      } );

      const xAxisNode = new Line( 0, 0, 140, 0, {
        lineWidth: 1,
        stroke: 'black',
        centerX: quadraticNode.centerX,
        centerY: quadraticNode.centerY
      } );

      const vertexNode = new Circle( POINT_RADIUS, {
        fill: GQColors.VERTEX,
        centerX: quadraticNode.centerX,
        centerY: quadraticNode.y
      } );

      const leftRootNode = new Circle( POINT_RADIUS, {
        fill: GQColors.ROOTS,
        centerX: quadraticNode.centerX - 35,
        centerY: xAxisNode.y
      } );

      const rightRootNode = new Circle( POINT_RADIUS, {
        fill: GQColors.ROOTS,
        centerX: quadraticNode.centerX + 35,
        centerY: xAxisNode.y
      } );

      const separator = new VSeparator( 15, {
        stroke: 'transparent',
        centerX: quadraticNode.centerX,
        top: quadraticNode.bottom
      } );

      const iconNode = new Node( {
        children: [ xAxisNode, quadraticNode, vertexNode, leftRootNode, rightRootNode, separator ]
      } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 1, // fill the full width of the screen icon
        maxIconHeightProportion: 1 // fill the full height of the screen icon
      } );
    },

    /**
     * Creates the icon for the Vertex Form screen.
     * @returns {Node}
     */
    createVertexFormScreenIcon() {

      const separator = new VSeparator( 20, { stroke: 'transparent' } );

      const quadratic = new Quadratic( A, B, C, { color: 'black' } );

      const bezierControlPoints = quadratic.getControlPoints( new Range( -50, 50 ) );

      const quadraticNode = new Path( new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint ), {
        lineWidth: 6,
        stroke: quadratic.color,
        centerX: separator.centerX,
        top: separator.bottom
      } );

      const vertexNode = new Manipulator( MANIPULATOR_RADIUS, GQColors.VERTEX, {
        haloAlpha: 0,
        pickable: false,
        centerX: quadraticNode.centerX,
        centerY: quadraticNode.y
      } );

      const iconNode = new Node( { children: [ separator, quadraticNode, vertexNode ] } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconHeightProportion: 1 // fill the full height of the screen icon
      } );
    },

    /**
     * Creates the icon for the Focus & Directrix screen.
     * @returns {Node}
     */
    createFocusAndDirectrixScreenIcon() {

      const quadratic = new Quadratic( -A, B, C, { color: 'black' } );

      const bezierControlPoints = quadratic.getControlPoints( new Range( -45, 45 ) );

      const quadraticNode = new Path( new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint ), {
        lineWidth: 6,
        stroke: quadratic.color
      } );

      const p = 35;
      
      const focusNode = new Manipulator( MANIPULATOR_RADIUS, GQColors.FOCUS, {
        haloAlpha: 0,
        pickable: false,
        centerX: quadraticNode.centerX,
        centerY: quadraticNode.y - p
      } );

      const directrixNode = new Line( 0, 0, 155, 0, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: 4,
        lineDash: [ 5, 5 ],
        centerX: quadraticNode.centerX,
        centerY: quadraticNode.y + p
      } );

      const separator = new VSeparator( 20, {
        stroke: 'transparent',
        centerX: directrixNode.centerX,
        top: directrixNode.bottom
      } );

      const iconNode = new Node( {
        children: [ quadraticNode, focusNode, directrixNode, separator ]
      } );

      return new ScreenIcon( iconNode, {
        fill: GQColors.SCREEN_BACKGROUND,
        maxIconWidthProportion: 1, // fill the full width of the screen icon
        maxIconHeightProportion: 1 // fill the full height of the screen icon
      } );
    }
  };

  return graphingQuadratics.register( 'GQIconFactory', GQIconFactory );
} );