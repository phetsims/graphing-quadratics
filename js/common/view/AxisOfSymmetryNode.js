// Copyright 2018, University of Colorado Boulder

/**
 * Displays the axis of symmetry for a quadratic.
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
  const Shape = require( 'KITE/Shape' );

  class AxisOfSymmetryNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, options ) {

      options = _.extend( {
        color: GQColors.AXIS_OF_SYMMETRY
      }, options );

      const path = new Path( null, {
        stroke: options.color,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );

      assert && assert( !options.children, 'AxisOfSymmetryNode sets children' );
      options.children = [ path ];

      super( options );

      const minY = modelViewTransform.modelToViewY( graph.yRange.max );
      const maxY = modelViewTransform.modelToViewY( graph.yRange.min );

      quadraticProperty.link( quadratic => {
        if ( quadratic.axisOfSymmetry === undefined ) {
          path.shape = null;
        }
        else {
          const x = modelViewTransform.modelToViewX( quadratic.axisOfSymmetry );
          path.shape = new Shape().moveTo( x, minY ).lineTo( x, maxY );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
} );