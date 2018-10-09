// Copyright 2018, University of Colorado Boulder

/**
 * Displays the directrix for a quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  class DirectrixNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Range} xRange - range of graph's x axis
     * @param {Range} yRange - range of graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, directrixVisibleProperty, equationsVisibleProperty ) {

      super();

      // the line
      const lineNode = new Line( 0, 0, 0, 1, {
        stroke: GQColors.DIRECTRIX,
        lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
        lineDash: GQConstants.DIRECTRIX_LINE_DASH
      } );
      this.addChild( lineNode );

      // equation on the line, created below
      let equationNode = null;

      // to improve readability
      const minX = modelViewTransform.modelToViewX( xRange.min );
      const maxX = modelViewTransform.modelToViewX( xRange.max );

      quadraticProperty.link( quadratic => {

        assert && assert( quadratic.directrix !== undefined, 'undefined directrix is not supported' );
        assert && assert( quadratic.vertex, 'expected vertex: ' + quadratic.vertex );

        // update the line
        const y = modelViewTransform.modelToViewY( quadratic.directrix );
        lineNode.setLine( minX, y, maxX, y );

        // update the equation
        equationNode && this.removeChild( equationNode );
        equationNode = GQEquationFactory.createDirectrix( quadratic.directrix );
        equationNode.maxWidth = 100; // determined empirically
        this.addChild( equationNode );

        // position the equation to avoid overlapping vertex and x axis
        if ( quadratic.vertex.x >= 0 ) {

          // vertex is at or to the right of origin, so put equation on left end of line
          equationNode.left = modelViewTransform.modelToViewX( xRange.min + GQConstants.EQUATION_X_MARGIN );
        }
        else {
          // vertex is to the left of origin, so put equation on right end of line
          equationNode.right = modelViewTransform.modelToViewX( xRange.max - GQConstants.EQUATION_X_MARGIN );
        }

        // space between the equation and directrix
        if ( quadratic.directrix > xRange.max - 1 ) {
          equationNode.top = lineNode.bottom + GQConstants.EQUATION_SPACING;
        }
        else {
          equationNode.bottom = lineNode.top - GQConstants.EQUATION_SPACING;
        }
      } );

      Property.multilink( [ directrixVisibleProperty, quadraticProperty ], ( directrixVisible, quadratic ) => {
        this.visible = !!( directrixVisible && yRange.contains( quadratic.directrix ) );
      } );

      equationsVisibleProperty.link( visible => { equationNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'DirectrixNode', DirectrixNode );
} );