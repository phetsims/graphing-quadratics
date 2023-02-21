// Copyright 2018-2022, University of Colorado Boulder

/**
 * Accordion box in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GQEquationAccordionBox, { GQEquationAccordionBoxOptions } from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import VertexFormModel from '../model/VertexFormModel.js';
import VertexFormEquationNode from './VertexFormEquationNode.js';
import VertexFormInteractiveEquationNode from './VertexFormInteractiveEquationNode.js';

type SelfOptions = EmptySelfOptions;

type VertexFormEquationAccordionBoxOptions = SelfOptions &
  PickRequired<GQEquationAccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class VertexFormEquationAccordionBox extends GQEquationAccordionBox {

  public constructor( model: VertexFormModel, providedOptions: VertexFormEquationAccordionBoxOptions ) {

    const titleNode = new VertexFormEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: providedOptions.tandem.createTandem( 'titleText' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const options = optionize<VertexFormEquationAccordionBoxOptions, SelfOptions, GQEquationAccordionBoxOptions>()( {

      // GQEquationAccordionBoxOptions
      titleNode: titleNode,
      phetioDocumentation: 'accordion box that contains the interactive equation'
    }, providedOptions );

    const interactiveEquationNode = new VertexFormInteractiveEquationNode(
      model.aProperty, model.hProperty, model.kProperty, options.tandem.createTandem( 'interactiveEquationNode' ) );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'VertexFormEquationAccordionBox', VertexFormEquationAccordionBox );