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
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  class DirectrixNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, directrixVisibleProperty, equationsVisibleProperty, options ) {

      options = _.extend( {
        color: GQColors.DIRECTRIX,
        decimals: GQConstants.EQUATION_DECIMALS
      }, options );

      const path = new Path( null, {
        stroke: options.color,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } );

      const equationNode = new RichText( '', {
        font: new PhetFont( 16 ),
        fill: options.color
      } );

      assert && assert( !options.children, 'Directrix sets children' );
      options.children = [ path, equationNode ];

      super( options );

      const minX = modelViewTransform.modelToViewX( graph.xRange.min );
      const maxX = modelViewTransform.modelToViewX( graph.xRange.max );

      quadraticProperty.link( quadratic => {

        assert && assert( quadratic.directrix !== undefined, 'undefined directrix is not supported' );

        // update the line
        const y = modelViewTransform.modelToViewY( quadratic.directrix );
        path.shape = new Shape().moveTo( minX, y ).lineTo( maxX, y );

        // update the equation
        equationNode.text = StringUtils.fillIn( '{{y}} = {{value}}', {
          y: GQSymbols.y,
          value: Util.toFixedNumber( quadratic.directrix, options.decimals )
        } );

        // position the equation to avoid overlapping vertex
        const xOffset = 15;
        const yOffset = 3;
        if ( quadratic.vertex.x >= 0 ) {
          equationNode.left = path.left + xOffset;
        }
        else {
          equationNode.right = path.right - xOffset;
        }

        if ( quadratic.directrix > quadratic.vertex.y ) {
          equationNode.bottom = path.top - yOffset;
        }
        else {
          equationNode.top = path.bottom + yOffset;
        }
      } );

      directrixVisibleProperty.link( visible => { this.visible = visible; } );
      equationsVisibleProperty.link( visible => { equationNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'DirectrixNode', DirectrixNode );
} );