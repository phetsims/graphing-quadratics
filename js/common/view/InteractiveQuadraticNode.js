// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of an interactive quadratic curve. Adds additional decorations.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryNode = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryNode' );
  const DirectrixNode = require( 'GRAPHING_QUADRATICS/common/view/DirectrixNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );
  const VertexNode = require( 'GRAPHING_QUADRATICS/common/view/VertexNode' );

  class InteractiveQuadraticNode extends QuadraticNode {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

      super( quadraticProperty, graph, modelViewTransform, options );

      // quadratic term, y = ax^2
      // This pattern of wrapping things in a parent node is used throughout.
      // The visibility of the parent nodes is synchronized with the viewProperties that control visibility,
      // while the child nodes are synchronized with the quadratic.
      const quadraticTermPath = new Path( null, { lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH } );
      const quadraticTermParentNode = new Node( { children: [ quadraticTermPath ] } );

      // linear term, y = bx
      const linearTermPath = new Path( null, { lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH } );
      const linearTermParentNode = new Node( { children: [ linearTermPath ] } );

      // constant term, y = c
      const constantTermPath = new Path( null, { lineWidth: GQConstants.QUADRATIC_TERMS_LINE_WIDTH } );
      const constantTermParentNode = new Node( { children: [ constantTermPath ] } );

      // axis of symmetry
      const axisOfSymmetryNode = new AxisOfSymmetryNode( quadraticProperty, graph, modelViewTransform );
      const axisOfSymmetryParentNode = new Node( { children: [ axisOfSymmetryNode ] } );

      // Radius of plotted points, in view coordinate frame
      const pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

      // vertex
      const vertexNode = new VertexNode( quadraticProperty, viewProperties.coordinatesVisibleProperty, {
        radius: pointRadius
      } );
      const vertexParentNode = new Node( { children: [ vertexNode ] } );

      // roots
      const root0Point = new PlottedPointNode( pointRadius, GQColors.ROOTS ); // left root, or single root
      const root1Point = new PlottedPointNode( pointRadius, GQColors.ROOTS ); // right root
      const rootPointsParentNode = new Node( { children: [ root0Point, root1Point ] } );

      // focus point
      const focusPoint = new PlottedPointNode( pointRadius, GQColors.FOCUS );
      const focusParentNode = new Node( { children: [ focusPoint ] } );

      // directrix
      const directrixNode = new DirectrixNode( quadraticProperty, graph, modelViewTransform );
      const directrixParentNode = new Node( { children: [ directrixNode ] } );

      // rendering order
      this.addChild( quadraticTermParentNode );
      this.addChild( linearTermParentNode );
      this.addChild( constantTermParentNode );
      this.addChild( axisOfSymmetryParentNode );
      this.addChild( directrixParentNode );
      this.quadraticPath.moveToFront(); // quadratic in front of the above decorations
      this.addChild( focusParentNode );
      this.addChild( rootPointsParentNode );
      this.addChild( vertexParentNode );

      // Control visibility of terms
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermParentNode.visible = visible; } );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermParentNode.visible = visible; } );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermParentNode.visible = visible; } );

      // Control visibility of decorations
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => { axisOfSymmetryParentNode.visible = visible; } );
      viewProperties.vertexVisibleProperty.link( visible => { vertexParentNode.visible = visible; } );
      viewProperties.rootsVisibleProperty.link( visible => { rootPointsParentNode.visible = visible; } );

      // Update the view of the curve when the quadratic model changes. dispose not needed.
      quadraticProperty.link( quadratic => {

        const quadraticTerm = quadratic.getQuadraticTerm();
        const linearTerm = quadratic.getLinearTerm();
        const constantTerm = quadratic.getConstantTerm();

        // update Shapes
        quadraticTermPath.shape = this.createQuadraticShape( quadraticTerm );
        linearTermPath.shape = this.createQuadraticShape( linearTerm );
        constantTermPath.shape = this.createQuadraticShape( constantTerm );

        // update colors
        quadraticTermPath.stroke = quadraticTerm.color;
        linearTermPath.stroke = linearTerm.color;
        constantTermPath.stroke = constantTerm.color;

        if ( quadratic.a !== 0 ) {

          // is a quadratic
          vertexNode.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
          focusPoint.center = modelViewTransform.modelToViewPosition( quadratic.focus );
          quadraticTermPath.visible = true;
          vertexNode.visible = true;
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
          vertexNode.visible = false;
          focusPoint.visible = false;
          root0Point.visible = false;
          root1Point.visible = false;
        }
      } );
    }
  }

  return graphingQuadratics.register( 'InteractiveQuadraticNode', InteractiveQuadraticNode );
} );