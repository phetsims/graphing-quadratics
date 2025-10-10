// Copyright 2018-2025, University of Colorado Boulder

/**
 * ExploreEquationAccordionBox is the Equation accordion box in the 'Explore' screen.
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
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

type SelfOptions = EmptySelfOptions;

type ExploreEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class ExploreEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: ExploreModel, providedOptions: ExploreEquationAccordionBoxOptions ) {

    const options = optionize<ExploreEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: new StandardFormEquationNode(),
      accessibleHelpText: new PatternStringProperty( GraphingQuadraticsStrings.a11y.exploreScreen.equationAccordionBox.accessibleHelpTextStringProperty, {
        equation: GraphingQuadraticsStrings.a11y.standardFormEquationStringProperty
      } )
    }, providedOptions );

    const interactiveEquationNode = new ExploreInteractiveEquationNode(
      model.aProperty, model.bProperty, model.cProperty, options.tandem.createTandem( 'interactiveEquationNode' ) );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'ExploreEquationAccordionBox', ExploreEquationAccordionBox );