// Copyright 2018-2024, University of Colorado Boulder

/**
 * Equation accordion box in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GQEquationAccordionBox, { GQEquationAccordionBoxOptions } from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormEquationNode from '../../standardform/view/StandardFormEquationNode.js';
import ExploreModel from '../model/ExploreModel.js';
import ExploreInteractiveEquationNode from './ExploreInteractiveEquationNode.js';

type SelfOptions = EmptySelfOptions;

type ExploreEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class ExploreEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: ExploreModel, providedOptions: ExploreEquationAccordionBoxOptions ) {

    const options = optionize<ExploreEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: new StandardFormEquationNode()
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