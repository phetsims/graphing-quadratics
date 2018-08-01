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
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const LINE_OPTIONS = {
    lineDash: [ 8, 8 ],
    lineDashOffset: 10
  };

  class QuadraticNode extends Node{
    /**
     * @param {Property.<Quadratic>} quadratic
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {LineFormsScreenView} viewProperties
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

      options = _.extend( {}, options );

      super( options );

      // view for the quadratic
      const quadraticPath = new Path( null, {
        stroke: 'red',
        lineWidth: 3
      } );

      // a curve representing just the ax^2 term for this quadratic
      const quadraticTermPath = new Path( null, {
        stroke: 'hotpink',
        lineWidth: 3
      } );

      // visibility of the parent node is determined by viewProperties
      // visibility of quadraticTermPath is determined by whether the quadratic is non degenerate
      const quadraticTermParentNode = new Node( { children: [ quadraticTermPath ] } );

      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermParentNode.visible = visible; } );

      // @private
      this.quadraticPath = quadraticPath;
      this.graph = graph;
      this.modelViewTransform = modelViewTransform;

      // make a property out of quadraticProperty.get().getLinearTerm() in order to pass into LineNode
      const linearTermProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.getLinearTerm() );

      // use the double headed arrow node from graphing-lines as a guide
      const linearTermPath = new LineNode( linearTermProperty, graph, modelViewTransform, { hasArrows: false } );

      const linearTermParentNode = new Node( { children: [ linearTermPath ] } );

      // link linear term line visibility to view property
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermParentNode.visible = visible; } );

      // make a property out of quadraticProperty.get().getConstantTerm() in order to pass into LineNode
      const constantTermProperty = new DerivedProperty(
        [ quadraticProperty ],
        quadratic => quadratic.getConstantTerm()
      );

      // use the double headed arrow node from graphing-lines as a guide
      const constantTermPath = new LineNode( constantTermProperty, graph, modelViewTransform, { hasArrows: false } );

      const constantTermParentNode = new Node( { children: [ constantTermPath ] } );

      // link constant term line visibility to view property
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermParentNode.visible = visible; } );

      const pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

      // vertex of the quadratic
      const vertexPoint = new PlottedPointNode( pointRadius, 'red' );
      const vertexPointParentNode = new Node( { children: [ vertexPoint ] } );

      // link vertex point visibility to view property
      viewProperties.vertexVisibleProperty.link( visible => { vertexPointParentNode.visible = visible; } );

      // the left most root if there are two roots, and the root if there is one root
      const root0Point = new PlottedPointNode( pointRadius, 'red' );

      // the right most root if there are two roots
      const root1Point = new PlottedPointNode( pointRadius, 'red' );

      const rootPointsParentNode = new Node( { children: [ root0Point, root1Point ] } );

      // link roots points to view property
      viewProperties.rootsVisibleProperty.link( visible => { rootPointsParentNode.visible = visible; } );

      // make a property out of quadraticProperty.get().axisOfSymmetry in order to pass into LineNode
      const axisOfSymmetryLineProperty = new DerivedProperty(
        [ quadraticProperty ],
        quadratic => quadratic.axisOfSymmetry
      );

      // view for the axis of symmetry of the quadratic
      const axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: LINE_OPTIONS
      } );

      const axisOfSymmetryLineParentNode = new Node( { children: [ axisOfSymmetryLine ] } );

      // link axis of symmetry line visibility to view property
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => {
        axisOfSymmetryLineParentNode.visible = visible;
      } );

      // view for the focus of the quadratic
      const focusPoint = new PlottedPointNode( pointRadius, 'green' );

      // make a property out of quadraticProperty.get().directrix in order to pass into LineNode
      const directrixLineProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.directrix );

      // view for the directrix of the quadratic
      const directrixLine = new LineNode( directrixLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: LINE_OPTIONS
      } );

      const directrixParentNode = new Node( { children: [ directrixLine, focusPoint ] } );

      // link focus point and directrix line visibility to view property
      viewProperties.directrixVisibleProperty.link( visible => { directrixParentNode.visible = visible; } );

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

        if ( quadratic.a !== 0 ) { // is a quadratic
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

    /**
     * Create a quadratic path with a certain color.
     * @param {Quadratic} quadratic
     * @param {Color|String} color - default 'red
     * @returns {Path}
     * @public
     */
    createPathWithColor( quadratic, color ) {
      return new Path( this.createQuadraticShape( quadratic ), {
        stroke: color || 'red',
        lineWidth: 3
      } );
    }

    /**
     * Create a quadratic shape. Assumes same graph and modelViewTransform as this one.
     * @param {Quadratic} quadratic
     * @returns {Shape}
     * @private
     */
    createQuadraticShape( quadratic ) {

      // have model calculate the control points to draw a bezier curve shape
      const bezierControlPoints = quadratic.getControlPoints( this.graph.xRange );

      // draw the quadratic
      return new Shape()
        .moveToPoint( bezierControlPoints.startPoint)
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
        .transformed( this.modelViewTransform.getMatrix() );
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );