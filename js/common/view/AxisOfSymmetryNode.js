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
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  class AxisOfSymmetryNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, axisOfSymmetryVisibleProperty, options ) {

      options = _.extend( {
        color: GQColors.AXIS_OF_SYMMETRY,
        decimals: GQConstants.EQUATION_DECIMALS
      }, options );

      const path = new Path( null, {
        stroke: options.color,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );

      const equationNode = new RichText( '', {
        font: new PhetFont( 16 ),
        fill: options.color,
        rotation: Math.PI / 2
      } );

      assert && assert( !options.children, 'AxisOfSymmetryNode sets children' );
      options.children = [ path, equationNode ];

      super( options );

      const minY = modelViewTransform.modelToViewY( graph.yRange.max );
      const maxY = modelViewTransform.modelToViewY( graph.yRange.min );

      quadraticProperty.link( quadratic => {

        if ( quadratic.axisOfSymmetry === undefined ) {
          path.shape = null;
          equationNode.text = '';
        }
        else {
          const x = modelViewTransform.modelToViewX( quadratic.axisOfSymmetry );
          path.shape = new Shape().moveTo( x, minY ).lineTo( x, maxY );

          equationNode.text = StringUtils.fillIn( '{{x}} = {{value}}', {
            x: GQSymbols.x,
            value: Util.toFixedNumber( quadratic.axisOfSymmetry, options.decimals )
          } );
          equationNode.left = path.right + 3;
          equationNode.top = path.top + 15;
        }
      } );

      axisOfSymmetryVisibleProperty.link( visible => { this.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
} );