// Copyright 2019-2021, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BackgroundNode, { BackgroundNodeOptions } from '../../../../scenery-phet/js/BackgroundNode.js';
import { Circle, Node } from '../../../../scenery/js/imports.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQQueryParameters from '../GQQueryParameters.js';

type SelfOptions = EmptySelfOptions;

type GQBackgroundNodeOptions = SelfOptions & BackgroundNodeOptions;

export default class GQBackgroundNode extends BackgroundNode {

  public constructor( node: Node, providedOptions?: GQBackgroundNodeOptions ) {

    const options = optionize<GQBackgroundNodeOptions, SelfOptions, BackgroundNodeOptions>()( {

      // BackgroundNodeOptions
      rectangleOptions: {
        fill: GQQueryParameters.equationsBackgroundColor
      }
    }, providedOptions );

    super( node, options );

    // put a red dot at the origin, for debugging positioning
    if ( GQQueryParameters.showOrigin ) {
      this.addChild( new Circle( 3, { fill: 'red' } ) );
    }
  }
}

graphingQuadratics.register( 'GQBackgroundNode', GQBackgroundNode );