// Copyright 2018, University of Colorado Boulder

/**
 * Dashed lines that connect the 'point on quadratic' to the focus and directrix.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {Property.<Quadratic>} quadraticProperty
   * @param {Property.<Vector2>} pointOnQuadraticProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<Boolean>} pointOnQuadraticVisibleProperty
   * @param {Property.<Boolean>} focusVisibleProperty
   * @param {Property.<Boolean>} directrixVisibleProperty
   */
  class PointOnQuadraticLinesNode extends Node {

    constructor( quadraticProperty, pointOnQuadraticProperty, modelViewTransform,
                 pointOnQuadraticVisibleProperty, focusVisibleProperty, directrixVisibleProperty ) {

      const path = new Path( null, {
        stroke: GQColors.POINT_ON_QUADRATIC,
        lineWidth: GQConstants.POINT_ON_QUADRATIC_LINE_WIDTH,
        lineDash: GQConstants.POINT_ON_QUADRATIC_LINE_DASH
      } );
      
      super( { children: [ path ] } );

      // update the lines
      Property.multilink( [ quadraticProperty, pointOnQuadraticProperty ],
        ( quadratic, pointOnQuadratic ) => {

          assert && assert( quadratic.focus !== undefined, 'undefined focus is not supported' );
          assert && assert( quadratic.directrix !== undefined, 'undefined directrix is not supported' );

          path.shape = new Shape()
            .moveToPoint( modelViewTransform.modelToViewPosition( quadratic.focus ) )
            .lineToPoint( modelViewTransform.modelToViewPosition( pointOnQuadratic ) )
            .lineTo( modelViewTransform.modelToViewX( pointOnQuadratic.x ), modelViewTransform.modelToViewY( quadratic.directrix ) );
        } );

      Property.multilink( [ pointOnQuadraticVisibleProperty, focusVisibleProperty, directrixVisibleProperty ],
        ( pointOnQuadraticVisible, focusVisibleProperty, directrixVisible ) => {
        path.visible = ( pointOnQuadraticVisible && focusVisibleProperty && directrixVisible );
        } );
    }
  }

  return graphingQuadratics.register( 'PointOnQuadraticLinesNode', PointOnQuadraticLinesNode );
} );