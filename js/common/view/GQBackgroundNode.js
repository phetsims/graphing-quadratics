// Copyright 2019, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BackgroundNode = require( 'SCENERY_PHET/BackgroundNode' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQQueryParameters = require( 'GRAPHING_QUADRATICS/common/GQQueryParameters' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const merge = require( 'PHET_CORE/merge' );

  class GQBackgroundNode extends BackgroundNode {

    /**
     * @param {Node} node - the Node that will be put on the background
     * @param {Object} [options]
     */
    constructor( node, options ) {

      options = merge( {
        backgroundOptions: {
          fill: GQQueryParameters.equationsBackgroundColor
        }
      }, options );

      super( node, options );

      // put a red dot at the origin, for debugging positioning
      if ( GQQueryParameters.showOrigin ) {
        this.addChild( new Circle( 3, { fill: 'red' } ) );
      }
    }
  }

  return graphingQuadratics.register( 'GQBackgroundNode', GQBackgroundNode );
} );