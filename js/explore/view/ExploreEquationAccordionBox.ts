// Copyright 2018-2021, University of Colorado Boulder

/**
 * Equation accordion box in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQEquationAccordionBox, { GQEquationAccordionBoxOptions } from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormEquationNode from '../../standardform/view/StandardFormEquationNode.js';
import ExploreInteractiveEquationNode from './ExploreInteractiveEquationNode.js';
import ExploreModel from '../model/ExploreModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type ExploreEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class ExploreEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: ExploreModel, providedOptions: ExploreEquationAccordionBoxOptions ) {

    const titleNode = new StandardFormEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: providedOptions.tandem.createTandem( 'titleNode' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const options = optionize<ExploreEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: titleNode
    }, providedOptions );

    const interactiveEquationNode = new ExploreInteractiveEquationNode(
      model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'ExploreEquationAccordionBox', ExploreEquationAccordionBox );