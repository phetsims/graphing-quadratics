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
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform, directrixVisibleProperty, options ) {

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

        if ( quadratic.directrix === undefined ) {
          this.visible = false;
          path.shape = null;
          equationNode.text = '';
        }
        else {
          this.visible = directrixVisibleProperty.value;

          const y = modelViewTransform.modelToViewY( quadratic.directrix );
          path.shape = new Shape().moveTo( minX, y ).lineTo( maxX, y );

          equationNode.text = StringUtils.fillIn( '{{y}} = {{value}}', {
            y: GQSymbols.y,
            value: Util.toFixedNumber( quadratic.directrix, options.decimals )
          } );
          equationNode.right = path.right - 15;
          equationNode.top = path.bottom + 3;
        }
      } );

      directrixVisibleProperty.link( visible => { this.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'DirectrixNode', DirectrixNode );
} );