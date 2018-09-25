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
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  class DirectrixNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Graph} xRange - range of graph's x axis
     * @param {Graph} yRange - range of graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} directrixVisibleProperty
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, directrixVisibleProperty, equationsVisibleProperty, options ) {

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
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: options.color
      } );

      assert && assert( !options.children, 'Directrix sets children' );
      options.children = [ path, equationNode ];

      super( options );

      const minX = modelViewTransform.modelToViewX( xRange.min );
      const maxX = modelViewTransform.modelToViewX( xRange.max );

      quadraticProperty.link( quadratic => {

        assert && assert( quadratic.directrix !== undefined, 'undefined directrix is not supported' );
        assert && assert( quadratic.vertex !== undefined, 'undefined vertex is not supported' );

        // update the line
        const y = modelViewTransform.modelToViewY( quadratic.directrix );
        path.shape = new Shape().moveTo( minX, y ).lineTo( maxX, y );

        // update the equation
        equationNode.text = StringUtils.fillIn( '{{y}} = {{value}}', {
          y: GQSymbols.y,
          value: Util.toFixedNumber( quadratic.directrix, options.decimals )
        } );

        // position the equation to avoid overlapping vertex and x axis
        const yOffset = 3;
        if ( quadratic.vertex.x >= 0 ) {
          equationNode.left = modelViewTransform.modelToViewX( xRange.min + 1 );
        }
        else {
          equationNode.right = modelViewTransform.modelToViewX( xRange.max - 1 );
        }
        
        if ( quadratic.directrix > xRange.max - 1 ) {
          equationNode.top = path.bottom + yOffset;
        }
        else {
          equationNode.bottom = path.top - yOffset;
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