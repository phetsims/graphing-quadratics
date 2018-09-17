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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
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

      // rendering order
      this.addChild( constantTermParentNode );
      this.addChild( linearTermParentNode );
      this.addChild( quadraticTermParentNode );
      this.quadraticPath.moveToFront(); // quadratic in front of the above decorations

      // Control visibility of terms
      viewProperties.quadraticTermVisibleProperty.link( visible => { quadraticTermParentNode.visible = visible; } );
      viewProperties.linearTermVisibleProperty.link( visible => { linearTermParentNode.visible = visible; } );
      viewProperties.constantTermVisibleProperty.link( visible => { constantTermParentNode.visible = visible; } );

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
      } );
    }
  }

  return graphingQuadratics.register( 'InteractiveQuadraticNode', InteractiveQuadraticNode );
} );