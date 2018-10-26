// Copyright 2018, University of Colorado Boulder

/**
 * Creates screen icons for this sim.  Most of the magic numbers herein were determined empirically,
 * to match the mockups provided in https://github.com/phetsims/graphing-quadratics/issues/11#issuecomment-427149327.
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
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const ICON_SIZE = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE; // so we can draw to the edges of the icons
  const CLIP_AREA = Shape.rect( 0, 0, ICON_SIZE.width, ICON_SIZE.height );
  const PARABOLA_COLOR = 'black';
  const PARABOLA_LINE_WIDTH = 20;
  const POINT_RADIUS = 35;
  const VERTEX_MANIPULATOR_RADIUS = 40;
  const FOCUS_MANIPULATOR_RADIUS = 25;
  const SCREEN_ICON_OPTIONS = {
    fill: GQColors.SCREEN_BACKGROUND,
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  };

  // coefficients and range that describe the parabola used in every icon
  const A = 0.0075;
  const B = 0;
  const C = 0;
  const RANGE = new Range( -250, 250 );

  const GQScreenIconFactory = {

    /**
     * Creates the icon for the Explore screen.
     * @returns {Node}
     * @public
     */
    createExploreScreenIcon() {

      // invisible rectangle that fills the entire icon
      const rectangle = new Rectangle( 0, 0, ICON_SIZE.width, ICON_SIZE.height );

      // parabola that opens downward
      const parabolaNode = createQuadraticNode( A, B, C, RANGE, {
        centerX: rectangle.centerX,
        top: rectangle.top + ( 0.2 * rectangle.height )
      } );

      // put all of the pieces together, clipped to the icon size
      const iconNode = new Node( {
        children: [ rectangle, parabolaNode ],
        clipArea: CLIP_AREA
      } );

      return new ScreenIcon( iconNode, SCREEN_ICON_OPTIONS );
    },

    /**
     * Creates the icon for the Standard Form screen.
     * @returns {Node}
     * @public
     */
    createStandardFormScreenIcon() {

      // invisible rectangle that fills the entire icon
      const rectangle = new Rectangle( 0, 0, ICON_SIZE.width, ICON_SIZE.height );

      // parabola that opens upward
      const parabolaNode = createQuadraticNode( -A, B, C, RANGE, {
        centerX: rectangle.centerX,
        y: 0.85 * rectangle.height
      } );

      // x axis, fills the width of the icon
      const xAxisNode = new Line( 0, 0, ICON_SIZE.width, 0, {
        lineWidth: 5,
        stroke: 'black',
        centerX: parabolaNode.centerX,
        centerY: 0.4 * rectangle.height
      } );

      // vertex
      const vertexNode = new Circle( POINT_RADIUS, {
        fill: GQColors.VERTEX,
        centerX: parabolaNode.centerX,
        centerY: parabolaNode.y
      } );

      // horizontal distance from vertex.x - determined empirically
      const root = 152;

      // roots
      const leftRootNode = new Circle( POINT_RADIUS, {
        fill: GQColors.ROOTS,
        centerX: parabolaNode.centerX - root,
        centerY: xAxisNode.y
      } );
      const rightRootNode = new Circle( POINT_RADIUS, {
        fill: GQColors.ROOTS,
        centerX: parabolaNode.centerX + root,
        centerY: xAxisNode.y
      } );

      // put all of the pieces together, clipped to the icon size
      const iconNode = new Node( {
        children: [ rectangle, xAxisNode, parabolaNode, vertexNode, leftRootNode, rightRootNode ],
        clipArea: CLIP_AREA
      } );

      return new ScreenIcon( iconNode, SCREEN_ICON_OPTIONS );
    },

    /**
     * Creates the icon for the Vertex Form screen.
     * @returns {Node}
     * @public
     */
    createVertexFormScreenIcon() {

      // invisible rectangle that fills the entire icon
      const rectangle = new Rectangle( 0, 0, ICON_SIZE.width, ICON_SIZE.height );

      // parabola that opens downward
      const parabolaNode = createQuadraticNode( A, B, C, RANGE, {
        centerX: rectangle.centerX,
        top: rectangle.top + ( 0.2 * ICON_SIZE.height )
      } );

      // vertex
      const vertexNode = Manipulator.createIcon( VERTEX_MANIPULATOR_RADIUS, GQColors.VERTEX, {
        centerX: parabolaNode.centerX,
        centerY: parabolaNode.y
      } );

      // put all of the pieces together, clipped to the icon size
      const iconNode = new Node( {
        children: [ rectangle, parabolaNode, vertexNode ],
        clipArea: CLIP_AREA
      } );

      return new ScreenIcon( iconNode, SCREEN_ICON_OPTIONS );
    },

    /**
     * Creates the icon for the Focus & Directrix screen.
     * @returns {Node}
     * @public
     */
    createFocusAndDirectrixScreenIcon() {

      // invisible rectangle that fills the entire icon
      const rectangle = new Rectangle( 0, 0, ICON_SIZE.width, ICON_SIZE.height );

      // parabola that opens upward
      const parabolaNode = createQuadraticNode( -A, B, C, RANGE, {
        centerX: rectangle.centerX,
        y: 0.55 * ICON_SIZE.height
      } );

      // vertical distance between focus and vertex, focus, and directrix - determined empirically
      const p = 100;

      // focus above the parabola's vertex
      const focusNode = Manipulator.createIcon( FOCUS_MANIPULATOR_RADIUS, GQColors.FOCUS, {
        centerX: parabolaNode.centerX,
        centerY: parabolaNode.y - p
      } );

      // directrix below the parabola's vertex, fills the width of the icon
      const directrixNode = new Line( 0, 0, ICON_SIZE.width, 0, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: 15,
        lineDash: [ 24, 24 ],
        centerX: parabolaNode.centerX,
        centerY: parabolaNode.y + p
      } );

      // put all of the pieces together, clipped to the icon size
      const iconNode = new Node( {
        children: [ rectangle, parabolaNode, focusNode, directrixNode ],
        clipArea: CLIP_AREA
      } );

      return new ScreenIcon( iconNode, SCREEN_ICON_OPTIONS );
    }
  };

  /**
   * Create a Node for quadratic y = ax^2 + bx + c
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {Range} range
   * @param {Object} [options]
   * @returns {Shape}
   */
  function createQuadraticNode( a, b, c, range, options ) {
    const quadratic = new Quadratic( a, b, c );
    const bezierControlPoints = quadratic.getControlPoints( range );
    const shape = new Shape()
      .moveToPoint( bezierControlPoints.startPoint )
      .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint );
    return new Path( shape, _.extend( {
      lineWidth: PARABOLA_LINE_WIDTH,
      stroke: PARABOLA_COLOR
    }, options ) );
  }

  return graphingQuadratics.register( 'GQScreenIconFactory', GQScreenIconFactory );
} );