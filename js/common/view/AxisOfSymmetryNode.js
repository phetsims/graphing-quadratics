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
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  class AxisOfSymmetryNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} yRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} axisOfSymmetryVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, yRange, modelViewTransform,
                 axisOfSymmetryVisibleProperty, equationsVisibleProperty, options ) {

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
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: options.color,
        rotation: Math.PI / 2
      } );

      assert && assert( !options.children, 'AxisOfSymmetryNode sets children' );
      options.children = [ path, equationNode ];

      super( options );

      const minY = modelViewTransform.modelToViewY( yRange.max );
      const maxY = modelViewTransform.modelToViewY( yRange.min );

      quadraticProperty.link( quadratic => {

        if ( quadratic.axisOfSymmetry !== undefined ) {
          assert && assert( quadratic.vertex !== undefined, 'undefined vertex is not supported' );

          // update the line
          const x = modelViewTransform.modelToViewX( quadratic.axisOfSymmetry );
          path.shape = new Shape().moveTo( x, minY ).lineTo( x, maxY );

          // update the equation
          equationNode.text = StringUtils.fillIn( '{{x}} = {{value}}', {
            x: GQSymbols.x,
            value: Util.toFixedNumber( quadratic.axisOfSymmetry, options.decimals )
          } );

          // position the equation to avoid overlapping vertex and y axis
          const xOffset = 3;
          const yOffset = 15;
          if ( quadratic.vertex.x >= 0 ) {
            equationNode.left = path.right + xOffset;
          }
          else {
            equationNode.right = path.left - xOffset;
          }

          if ( quadratic.vertex.y >= 0 ) {
            equationNode.bottom = path.bottom - yOffset;
          }
          else {
            equationNode.top = path.top + yOffset;
          }
        }
      } );

      Property.multilink( [ axisOfSymmetryVisibleProperty, quadraticProperty ],
        ( axisOfSymmetryVisible, quadratic ) => {
          this.visible = !!( axisOfSymmetryVisible && quadratic.axisOfSymmetry !== undefined );
        } );

      equationsVisibleProperty.link( visible => { equationNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'AxisOfSymmetryNode', AxisOfSymmetryNode );
} );