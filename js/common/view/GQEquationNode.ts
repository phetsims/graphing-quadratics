// Copyright 2019-2025, University of Colorado Boulder

/**
 * Puts a Node on a rectangular background, dynamically sized to fit the Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import BackgroundNode, { BackgroundNodeOptions } from '../../../../scenery-phet/js/BackgroundNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQQueryParameters from '../GQQueryParameters.js';

type SelfOptions = {
  textOptions?: RichTextOptions;
};

type GQBackgroundNodeOptions = SelfOptions &
  PickOptional<BackgroundNodeOptions, 'visibleProperty' | 'maxWidth' | 'maxHeight'>;

export default class GQEquationNode extends BackgroundNode {

  private readonly equationText: RichText;

  public constructor( providedOptions?: GQBackgroundNodeOptions ) {

    const options = optionize<GQBackgroundNodeOptions, SelfOptions, BackgroundNodeOptions>()( {

      // SelfOptions
      textOptions: {
        font: GQConstants.GRAPHED_EQUATION_FONT
      },

      // BackgroundNodeOptions
      rectangleOptions: {
        fill: GQQueryParameters.equationsBackgroundColor
      }
    }, providedOptions );

    const equationText = new RichText( '', options.textOptions );

    super( equationText, options );

    this.equationText = equationText;

    // put a red dot at the origin, for debugging positioning
    if ( GQQueryParameters.showOrigin ) {
      this.addChild( new Circle( 3, { fill: 'red' } ) );
    }
  }

  public setTextString( value: string ): void {
    this.equationText.string = value;
  }

  public setTextFill( fill: TColor ): void {
    this.equationText.fill = fill;
  }
}

graphingQuadratics.register( 'GQEquationNode', GQEquationNode );