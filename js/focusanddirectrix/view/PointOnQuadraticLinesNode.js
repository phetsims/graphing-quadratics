// Copyright 2018, University of Colorado Boulder

/**
 * Dashed lines that connect the 'point on quadratic' to the focus and directrix.
 * This is implemented as 2 Lines (rather than 1 Path) so that their visibility can be controlled independently.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  /**
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Property.<Vector2>} pointOnQuadraticProperty - a point on the interactive quadratic
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<Boolean>} pointOnQuadraticVisibleProperty
   * @param {Property.<Boolean>} focusVisibleProperty
   * @param {Property.<Boolean>} directrixVisibleProperty
   */
  class PointOnQuadraticLinesNode extends Node {

    constructor( quadraticProperty, pointOnQuadraticProperty, modelViewTransform,
                 pointOnQuadraticVisibleProperty, focusVisibleProperty, directrixVisibleProperty ) {

      const pathOptions = {
        stroke: GQColors.POINT_ON_QUADRATIC,
        lineWidth: GQConstants.POINT_ON_QUADRATIC_LINE_WIDTH,
        lineDash: GQConstants.POINT_ON_QUADRATIC_LINE_DASH
      };

      // line connecting point and focus
      const focusLine = new Line( 0, 0, 0, 1, pathOptions );

      // line connecting point and directrix                                             
      const directrixLine = new Line( 0, 0, 0, 1, pathOptions );

      super( { children: [ focusLine, directrixLine ] } );

      // update the lines
      Property.multilink( [ quadraticProperty, pointOnQuadraticProperty ],
        ( quadratic, pointOnQuadratic ) => {

          assert && assert( quadratic.focus, 'expected focus: ' + quadratic.focus );
          assert && assert( quadratic.directrix !== undefined, 'undefined directrix is not supported' );

          const pointView = modelViewTransform.modelToViewPosition( pointOnQuadratic );
          const focusView = modelViewTransform.modelToViewPosition( quadratic.focus );
          const directrixView = modelViewTransform.modelToViewY( quadratic.directrix );

          focusLine.setLine( pointView.x, pointView.y, focusView.x, focusView.y );
          directrixLine.setLine( pointView.x, pointView.y, pointView.x, directrixView );
        } );

      // visibility
      Property.multilink( [ pointOnQuadraticVisibleProperty, focusVisibleProperty, directrixVisibleProperty ],
        ( pointOnQuadraticVisible, focusVisibleProperty, directrixVisible ) => {
          focusLine.visible = ( pointOnQuadraticVisible && focusVisibleProperty );
          directrixLine.visible = ( pointOnQuadraticVisible && directrixVisible );
        } );
    }
  }

  return graphingQuadratics.register( 'PointOnQuadraticLinesNode', PointOnQuadraticLinesNode );
} );