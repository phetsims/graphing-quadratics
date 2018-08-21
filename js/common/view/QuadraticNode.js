// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic curve, its individual terms, and all of it's related decorations.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
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

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

      options = _.extend( {}, options );

      super( options );

      // @private
      this.graph = graph;
      this.modelViewTransform = modelViewTransform;

      // quadratic curve, y = ax^2 + bx + c
      const quadraticPath = new Path( null, {
        stroke: GQColors.INTERACTIVE_CURVE,
        lineWidth: 3
      } );

      // quadratic term, y = ax^2
      const quadraticTermPath = new Path( null, {
        stroke: GQColors.QUADRATIC_TERM,
        lineWidth: 3
      } );

      // This pattern of wrapping things in a parent node is used throughout.
      // The visibility of the parent nodes is synchronized with the viewProperties that control visibility,
      // while the child nodes are synchronized with the quadratic.
      const quadraticTermParentNode = new Node( { children: [ quadraticTermPath ] } );

      // linear term, y = bx
      // make a Property out of quadraticProperty.value.getLinearTerm() in order to pass into LineNode
      const linearTermProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.getLinearTerm() );
      const linearTermPath = new LineNode( linearTermProperty, graph, modelViewTransform, { hasArrows: false } );
      const linearTermParentNode = new Node( { children: [ linearTermPath ] } );

      // constant term, y = c
      // make a Property out of quadraticProperty.value.getConstantTerm() in order to pass into LineNode
      const constantTermProperty = new DerivedProperty(
        [ quadraticProperty ],
        quadratic => quadratic.getConstantTerm()
      );
      const constantTermPath = new LineNode( constantTermProperty, graph, modelViewTransform, { hasArrows: false } );
      const constantTermParentNode = new Node( { children: [ constantTermPath ] } );

      // axis of symmetry
      // make a Property out of quadraticProperty.value.axisOfSymmetry in order to pass into LineNode
      const axisOfSymmetryLineProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.axisOfSymmetry );
      const axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: LINE_OPTIONS
      } );
      const axisOfSymmetryLineParentNode = new Node( { children: [ axisOfSymmetryLine ] } );

      // Radius of plotted points, in view coordinate frame
      const pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

      // vertex
      const vertexPoint = new PlottedPointNode( pointRadius, GQColors.VERTEX );
      const vertexPointParentNode = new Node( { children: [ vertexPoint ] } );

      // roots
      const root0Point = new PlottedPointNode( pointRadius, GQColors.ROOTS ); // left root, or single root
      const root1Point = new PlottedPointNode( pointRadius, GQColors.ROOTS ); // right root
      const rootPointsParentNode = new Node( { children: [ root0Point, root1Point ] } );

      // focus point
      const focusPoint = new PlottedPointNode( pointRadius, GQColors.DIRECTRIX );

      // directrix
      // make a property out of quadraticProperty.value.directrix in order to pass into LineNode
      const directrixLineProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.directrix );
      const directrixLine = new LineNode( directrixLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: LINE_OPTIONS
      } );
      const directrixParentNode = new Node( { children: [ directrixLine, focusPoint ] } );

      // rendering order
      this.addChild( quadraticPath );
      this.addChild( quadraticTermParentNode );
      this.addChild( linearTermParentNode );
      this.addChild( constantTermParentNode );
      this.addChild( axisOfSymmetryLineParentNode );
      this.addChild( vertexPointParentNode );
      this.addChild( directrixParentNode );
      this.addChild( rootPointsParentNode );

      // Control visibility of terms
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermParentNode.visible = visible; } );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermParentNode.visible = visible; } );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermParentNode.visible = visible; } );

      // Control visibility of decorations
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => {axisOfSymmetryLineParentNode.visible = visible; } );
      viewProperties.vertexVisibleProperty.link( visible => { vertexPointParentNode.visible = visible; } );
      viewProperties.rootsVisibleProperty.link( visible => { rootPointsParentNode.visible = visible; } );
      viewProperties.directrixVisibleProperty.link( visible => { directrixParentNode.visible = visible; } );

      // Update the view of the curve when the quadratic model changes. dispose not needed.
      quadraticProperty.link( quadratic => {

        quadraticPath.setShape( this.createQuadraticShape( quadratic ) );

        if ( quadratic.a !== 0 ) {

          // is a quadratic
          quadraticTermPath.setShape( this.createQuadraticShape( quadratic.getQuadraticTerm() ) );
          vertexPoint.center = modelViewTransform.modelToViewPosition( quadratic.vertex );
          focusPoint.center = modelViewTransform.modelToViewPosition( quadratic.focus );
          quadraticTermPath.visible = true;
          vertexPoint.visible = true;
          focusPoint.visible = true;

          // roots
          if ( quadratic.roots.length === 2 ) {
            // two roots
            root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
            root1Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 1 ] );
            root0Point.visible = true;
            root1Point.visible = true;
          }
          else if ( quadratic.roots.length === 1 ) {
            // one root
            root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
            root0Point.visible = true;
            root1Point.visible = false;
          }
          else {
            // no roots
            root0Point.visible = false;
            root1Point.visible = false;
          }
        }
        else {
          // not a quadratic
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
     * @param {Color|String} color - default colorblind red in GQColors.ACTIVE_CURVE
     * @returns {Path}
     * @public
     */
    createPathWithColor( quadratic, color ) {
      return new Path( this.createQuadraticShape( quadratic ), {
        stroke: color || GQColors.INTERACTIVE_CURVE,
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