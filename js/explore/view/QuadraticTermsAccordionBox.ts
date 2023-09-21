// Copyright 2018-2023, University of Colorado Boulder

/**
 * Accordion box for showing and hiding terms of the interactive quadratic equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import ExploreViewProperties from './ExploreViewProperties.js';

type SelfOptions = EmptySelfOptions;

type QuadraticTermsAccordionBoxOptions = SelfOptions & PickRequired<AccordionBoxOptions, 'tandem' | 'expandedProperty'>;

export default class QuadraticTermsAccordionBox extends AccordionBox {

  public constructor( viewProperties: ExploreViewProperties, providedOptions: QuadraticTermsAccordionBoxOptions ) {

    const options = optionize4<QuadraticTermsAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()(
      {}, GQConstants.ACCORDION_BOX_OPTIONS, {

        // AccordionBoxOptions
        titleAlignX: 'left',
        titleXSpacing: 8,
        phetioDocumentation: 'the Quadratic Terms accordion box'
      }, providedOptions );

    // AccordionBox title
    options.titleNode = new Text( GraphingQuadraticsStrings.quadraticTermsStringProperty, {
      font: GQConstants.TITLE_FONT,
      maxWidth: 275 // determined empirically
    } );

    // y = ax^2
    const quadraticTermCheckbox = GQCheckbox.createQuadraticTermCheckbox( viewProperties.quadraticTermVisibleProperty,
      options.tandem.createTandem( 'quadraticTermCheckbox' ) );

    // y = bx
    const linearTermCheckbox = GQCheckbox.createLinearTermCheckbox( viewProperties.linearTermVisibleProperty,
      options.tandem.createTandem( 'linearTermCheckbox' ) );

    // y = c
    const constantTermCheckbox = GQCheckbox.createConstantTermCheckbox( viewProperties.constantTermVisibleProperty,
      options.tandem.createTandem( 'constantTermCheckbox' ) );

    // Equations
    const equationsCheckbox = GQCheckbox.createEquationsCheckbox( viewProperties.equationsVisibleProperty,
      options.tandem.createTandem( 'equationsCheckbox' ) );

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      stretch: true, // See https://github.com/phetsims/graphing-quadratics/issues/197
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        quadraticTermCheckbox,
        linearTermCheckbox,
        constantTermCheckbox,
        new HSeparator( {
          stroke: GQColors.separatorStrokeProperty
        } ),
        equationsCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'QuadraticTermsAccordionBox', QuadraticTermsAccordionBox );