// Copyright 2018-2022, University of Colorado Boulder

/**
 * Equation accordion box in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GQEquationAccordionBox, { GQEquationAccordionBoxOptions } from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormModel from '../model/StandardFormModel.js';
import StandardFormEquationNode from './StandardFormEquationNode.js';
import StandardFormInteractiveEquationNode from './StandardFormInteractiveEquationNode.js';

type SelfOptions = EmptySelfOptions;

type StandardFormEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class StandardFormEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: StandardFormModel, providedOptions: StandardFormEquationAccordionBoxOptions ) {

    const titleNode = new StandardFormEquationNode( {
      tandem: providedOptions.tandem.createTandem( 'titleText' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box'
    } );

    const options = optionize<StandardFormEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: titleNode,
      phetioDocumentation: 'accordion box that contains the interactive equation'
    }, providedOptions );

    const interactiveEquationNode = new StandardFormInteractiveEquationNode(
      model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'StandardFormEquationAccordionBox', StandardFormEquationAccordionBox );