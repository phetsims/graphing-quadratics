// Copyright 2018, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  class BackgroundNode extends Node {

    /**
     * @param {Node} node - the Node that will be put on the background
     * @param {Object} [options]
     */
    constructor( node, options ) {

      options = _.extend( {
        backgroundFill: GQQueryParameters.equationsBackgroundColor,
        backgroundOpacity: 0.75,
        xMargin: 2,
        yMargin: 2
      }, options );

      // translucent rectangle
      const rectangle = new Rectangle( 0, 0, 1, 1, {
        fill: options.backgroundFill,
        opacity: options.backgroundOpacity
      } );

      // size the rectangle to fit the node
      node.on( 'bounds', function() {
        rectangle.setRect( 0, 0, node.width + 2 * options.xMargin, node.height + 2 * options.yMargin );
        node.center = rectangle.center;
      });

      assert && assert( !options.children, 'BackgroundNode sets children' );
      options.children = [ rectangle, node ];
      
      super( options );
      
      // put a red dot at the origin, for debugging positioning
      if ( GQQueryParameters.showOrigin ) {
        this.addChild( new Circle( 3, { fill: 'red' } ) );
      }
    }
  }

  return graphingQuadratics.register( 'BackgroundNode', BackgroundNode );
} );