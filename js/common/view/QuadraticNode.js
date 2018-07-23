// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic curve.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const LINE_OPTIONS = {
    lineDash: [ 8, 8 ],
    lineDashOffset: 10
  };

  /**
   * @param {Property.<Quadratic>} quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {LineFormsScreenView} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function QuadraticNode( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

    options = _.extend( {}, options );

    Node.call( this, options );

    const quadraticPath = new Path( null, {
      stroke: 'red',
      lineWidth: 3
    } );

    // a curve representing y=ax^2 for this quadratic
    const quadraticTermPath = new Path( null, {
      stroke: 'hotpink',
      lineWidth: 3
    } );
    const quadraticTermParentNode = new Node( { children: [ quadraticTermPath ] } );

    viewProperties.quadraticTermVisibleProperty.link( function( visible ) {
      quadraticTermParentNode.visible = visible;
    } );

    // @private
    this.quadraticPath = quadraticPath;
    this.graph = graph;
    this.modelViewTransform = modelViewTransform;

    // make a property out of quadraticProperty.get().getLinearTerm() in order to pass into LineNode
    const linearTermProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.getLinearTerm();
    } );

    // use the double headed arrow node from graphing-lines as a guide
    const linearTermPath = new LineNode( linearTermProperty, graph, modelViewTransform, { hasArrows: false } );

    const linearTermParentNode = new Node( { children: [ linearTermPath ] } );

    // link linear term line visibility to view property
    viewProperties.linearTermVisibleProperty.link( function( visible ) {
      linearTermParentNode.visible = visible;
    } );

    // make a property out of quadraticProperty.get().getConstantTerm() in order to pass into LineNode
    const constantTermProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.getConstantTerm();
    } );

    // use the double headed arrow node from graphing-lines as a guide
    const constantTermPath = new LineNode( constantTermProperty, graph, modelViewTransform, { hasArrows: false } );

    const constantTermParentNode = new Node( { children: [ constantTermPath ] } );

    // link constant term line visibility to view property
    viewProperties.constantTermVisibleProperty.link( function( visible ) {
      constantTermParentNode.visible = visible;
    } );

    const pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

    // vertex of the quadratic
    const vertexPoint = new PlottedPointNode( pointRadius, 'red' );
    const vertexPointParentNode = new Node( { children: [ vertexPoint ] } );

    // link vertex point visibility to view property
    viewProperties.vertexVisibleProperty.link( function( visible ) {
      vertexPointParentNode.visible = visible;
    } );

    // the left most root if there are two roots, and the root if there is one root
    const root0Point = new PlottedPointNode( pointRadius, 'red' );

    // the right most root if there are two roots
    const root1Point = new PlottedPointNode( pointRadius, 'red' );

    const rootPointsParentNode = new Node( { children: [ root0Point, root1Point ] } );

    // link roots points to view property
    viewProperties.rootsVisibleProperty.link( function( visible ) {
      rootPointsParentNode.visible = visible;
    } );

    // make a property out of quadraticProperty.get().axisOfSymmetry in order to pass into LineNode
    const axisOfSymmetryLineProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.axisOfSymmetry;
    } );

    // use the double headed arrow node from graphing-lines as a guide
    const axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
      hasArrows: false,
      lineOptions: LINE_OPTIONS
    } );

    const axisOfSymmetryLineParentNode = new Node( { children: [ axisOfSymmetryLine ] } );

    // link axis of symmetry line visibility to view property
    viewProperties.axisOfSymmetryVisibleProperty.link( function( visible ) {
      axisOfSymmetryLineParentNode.visible = visible;
    } );

    // focus of the quadratic
    const focusPoint = new PlottedPointNode( pointRadius, 'green' );

    // make a property out of quadraticProperty.get().directrix in order to pass into LineNode
    const directrixLineProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.directrix;
    } );

    // use the double headed arrow node from graphing-lines as a guide
    const directrixLine = new LineNode( directrixLineProperty, graph, modelViewTransform, {
      hasArrows: false,
      lineOptions: LINE_OPTIONS
    } );

    const directrixParentNode = new Node( { children: [ directrixLine, focusPoint ] } );

    // link focus point and directrix line visibility to view property
    viewProperties.directrixVisibleProperty.link( function( visible ) {
      directrixParentNode.visible = visible;
    } );

    // rendering order
    this.addChild( quadraticPath );
    this.addChild( quadraticTermParentNode );
    this.addChild( linearTermParentNode );
    this.addChild( constantTermParentNode );
    this.addChild( axisOfSymmetryLineParentNode );
    this.addChild( vertexPointParentNode );
    this.addChild( directrixParentNode );
    this.addChild( rootPointsParentNode );

    // Update the view of the curve when the quadratic model changes
    // TODO: dispose
    quadraticProperty.link( quadratic => {

      quadraticPath.setShape( this.createQuadraticShape( quadratic ) );

      // update other information about the quadratic curve

      if ( quadratic.a !== 0 ) {
        quadraticTermPath.setShape( this.createQuadraticShape( quadratic.getQuadraticTerm() ) );
        vertexPoint.center = modelViewTransform.modelToViewPosition( quadratic.vertex );
        focusPoint.center = modelViewTransform.modelToViewPosition( quadratic.focus );
        quadraticTermPath.visible = true;
        vertexPoint.visible = true;
        focusPoint.visible = true;

        if ( quadratic.roots.length === 2 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root1Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 1 ] );
          root0Point.visible = true;
          root1Point.visible = true;
        }
        else if ( quadratic.roots.length === 1 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root0Point.visible = true;
          root1Point.visible = false;

        }
        else { // no real roots
          root0Point.visible = false;
          root1Point.visible = false;
        }
      }
      else { // not quadratic
        quadraticTermPath.visible = false;
        vertexPoint.visible = false;
        focusPoint.visible = false;
        root0Point.visible = false;
        root1Point.visible = false;
      }
    } );

  }

  graphingQuadratics.register( 'QuadraticNode', QuadraticNode );

  return inherit( Node, QuadraticNode, {

    /**
     * Create a quadratic path with a certain color.
     * @param {Quadratic} quadratic
     * @param {Color|String} color - default 'red
     * @returns {Path}
     *
     * @public
     */
    createPathWithColor: function( quadratic, color ) {
      return new Path( this.createQuadraticShape( quadratic ), {
        stroke: color || 'red',
        lineWidth: 3
      } );
    },

    /**
     * Create a quadratic shape. Assumes same graph and modelViewTransform as this one.
     * @param {Quadratic} quadratic
     * @returns {Shape}
     *
     * @private
     */
    createQuadraticShape: function( quadratic ) {

      // given coefficients, calculate control points for the quadratic bezier curve
      // see https://github.com/phetsims/graphing-quadratics/issues/1
      const a = quadratic.a;
      const b = quadratic.b;
      const c = quadratic.c;
      const minX = this.graph.xRange.min;
      const maxX = this.graph.xRange.max;
      const xRange = this.graph.xRange.getLength();

      const aPrime = a * xRange * xRange;
      const bPrime = 2 * a * minX * xRange + b * xRange;
      const cPrime = a * minX * minX + b * minX + c;

      const startPoint = new Vector2( minX, cPrime );
      const controlPoint = new Vector2( ( minX + maxX ) / 2, bPrime / 2 + cPrime );
      const endPoint = new Vector2( maxX, aPrime + bPrime + cPrime );

      // draw the quadratic
      return new Shape()
        .moveToPoint( startPoint)
        .quadraticCurveToPoint( controlPoint, endPoint )
        .transformed( this.modelViewTransform.getMatrix() );
    }
  });
} );