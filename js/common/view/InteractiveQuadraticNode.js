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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PlottedPointNode = require( 'GRAPHING_QUADRATICS/common/view/PlottedPointNode' );
  const QuadraticNode = require( 'GRAPHING_QUADRATICS/common/view/QuadraticNode' );

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
      // make a Property out of quadraticProperty.value.axisOfSymmetry in order to pass into LineNode
      const axisOfSymmetryLineProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.axisOfSymmetry );
      const axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: {
          lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
          lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
        }
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
      const focusPoint = new PlottedPointNode( pointRadius, GQColors.FOCUS );
      const focusParentNode = new Node( { children: [ focusPoint ] } );

      // directrix
      // make a property out of quadraticProperty.value.directrix in order to pass into LineNode
      const directrixLineProperty = new DerivedProperty( [ quadraticProperty ], quadratic => quadratic.directrix );
      const directrixLine = new LineNode( directrixLineProperty, graph, modelViewTransform, {
        hasArrows: false,
        lineOptions: {
          lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
          lineDash: GQConstants.DIRECTRIX_LINE_DASH
        }
      } );
      const directrixParentNode = new Node( { children: [ directrixLine ] } );

      // rendering order
      this.addChild( quadraticTermParentNode );
      this.addChild( linearTermParentNode );
      this.addChild( constantTermParentNode );
      this.addChild( axisOfSymmetryLineParentNode );
      this.addChild( directrixParentNode );
      this.quadraticPath.moveToFront(); // quadratic in front of the above decorations
      this.addChild( focusParentNode );
      this.addChild( rootPointsParentNode );
      this.addChild( vertexPointParentNode );

      // Control visibility of terms
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermParentNode.visible = visible; } );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermParentNode.visible = visible; } );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermParentNode.visible = visible; } );

      // Control visibility of decorations
      viewProperties.axisOfSymmetryVisibleProperty.link( visible => {axisOfSymmetryLineParentNode.visible = visible; } );
      viewProperties.vertexVisibleProperty.link( visible => { vertexPointParentNode.visible = visible; } );
      viewProperties.rootsVisibleProperty.link( visible => { rootPointsParentNode.visible = visible; } );
      viewProperties.focusVisibleProperty.link( visible => { focusParentNode.visible = visible; } );
      viewProperties.directrixVisibleProperty.link( visible => { directrixParentNode.visible = visible; } );

      // Update the view of the curve when the quadratic model changes. dispose not needed.
      quadraticProperty.link( quadratic => {

        const quadraticTerm = quadratic.getQuadraticTerm();
        const linearTerm = quadratic.getLinearTerm();
        const constantTerm = quadratic.getConstantTerm();

        // update Shapes
        quadraticTermPath.setShape( this.createQuadraticShape( quadraticTerm ) );
        linearTermPath.setShape( this.createQuadraticShape( linearTerm ) );
        constantTermPath.setShape( this.createQuadraticShape( constantTerm ) );

        // update colors
        quadraticTermPath.stroke = quadraticTerm.color;
        linearTermPath.stroke = linearTerm.color;
        constantTermPath.stroke = constantTerm.color;

        if ( quadratic.a !== 0 ) {

          // is a quadratic
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
  }

  return graphingQuadratics.register( 'InteractiveQuadraticNode', InteractiveQuadraticNode );
} );