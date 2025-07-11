// Copyright 2018-2025, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GQEquationAccordionBox, { GQEquationAccordionBoxOptions } from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import FocusAndDirectrixModel from '../model/FocusAndDirectrixModel.js';
import FocusAndDirectrixEquationNode from './FocusAndDirectrixEquationNode.js';
import FocusAndDirectrixInteractiveEquationNode from './FocusAndDirectrixInteractiveEquationNode.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

type SelfOptions = EmptySelfOptions;

type FocusAndDirectrixEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class FocusAndDirectrixEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: FocusAndDirectrixModel, providedOptions: FocusAndDirectrixEquationAccordionBoxOptions ) {

    const options = optionize<FocusAndDirectrixEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: new FocusAndDirectrixEquationNode(),
      accessibleName: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.equationAccordionBox.accessibleNameStringProperty,
      phetioDocumentation: 'accordion box that contains the interactive equation'
    }, providedOptions );

    const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
      model.pProperty, model.hProperty, model.kProperty, options.tandem.createTandem( 'interactiveEquationNode' ) );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixEquationAccordionBox', FocusAndDirectrixEquationAccordionBox );