// Copyright 2018, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
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
        backgroundFill: 'white',
        backgroundOpacity: 0.75,
        xMargin: 2,
        yMargin: 2
      }, options );

      // translucent background
      const backgroundNode = new Rectangle( 0, 0, 1, 1, {
        fill: options.backgroundFill,
        opacity: options.backgroundOpacity
      } );

      // size the background to fit the node
      node.on( 'bounds', function() {
        backgroundNode.setRect( 0, 0, node.width + 2 * options.xMargin, node.height + 2 * options.yMargin );
        node.center = backgroundNode.center;
      });

      assert && assert( !options.children, 'BackgroundNode sets children' );
      options.children = [ backgroundNode, node ];
      
      super( options );
    }
  }

  return graphingQuadratics.register( 'BackgroundNode', BackgroundNode );
} );