// Copyright 2019-2020, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQQueryParameters from '../GQQueryParameters.js';

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

graphingQuadratics.register( 'GQBackgroundNode', GQBackgroundNode );
export default GQBackgroundNode;