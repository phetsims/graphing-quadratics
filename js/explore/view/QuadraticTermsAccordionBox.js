// Copyright 2018-2022, University of Colorado Boulder

/**
 * Accordion box for showing and hiding terms of the interactive quadratic equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import EquationsCheckbox from '../../common/view/EquationsCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import ConstantTermCheckbox from './ConstantTermCheckbox.js';
import LinearTermCheckbox from './LinearTermCheckbox.js';
import QuadraticTermCheckbox from './QuadraticTermCheckbox.js';

class QuadraticTermsAccordionBox extends AccordionBox {

  /**
   * @param {ExploreViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {

    options = merge( {}, GQConstants.ACCORDION_BOX_OPTIONS, {

      // AccordionBox options
      titleAlignX: 'left',
      titleXSpacing: 8,

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'the Quadratic Terms accordion box'

    }, options );

    // AccordionBox title
    assert && assert( !options.titleNode, 'QuadraticTermsAccordionBox sets titleNode' );
    options.titleNode = new Text( GraphingQuadraticsStrings.quadraticTerms, {
      font: GQConstants.TITLE_FONT,
      maxWidth: 180, // determined empirically
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioDocumentation: 'the title on this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    // y = ax^2
    const quadraticTermCheckbox = new QuadraticTermCheckbox( viewProperties.quadraticTermVisibleProperty, {
      tandem: options.tandem.createTandem( 'quadraticTermCheckbox' )
    } );

    // y = bx
    const linearTermCheckbox = new LinearTermCheckbox( viewProperties.linearTermVisibleProperty, {
      tandem: options.tandem.createTandem( 'linearTermCheckbox' )
    } );

    // y = c
    const constantTermCheckbox = new ConstantTermCheckbox( viewProperties.constantTermVisibleProperty, {
      tandem: options.tandem.createTandem( 'constantTermCheckbox' )
    } );

    // Equations
    const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
      tandem: options.tandem.createTandem( 'equationsCheckbox' )
    } );

    const maxCheckboxWidth = _.maxBy(
      [ quadraticTermCheckbox, linearTermCheckbox, constantTermCheckbox, equationsCheckbox ],
      node => node.width ).width;

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        quadraticTermCheckbox,
        linearTermCheckbox,
        constantTermCheckbox,
        new HSeparator( {
          stroke: GQColors.SEPARATOR,

          // See https://github.com/phetsims/graphing-quadratics/issues/128
          minimumWidth: Math.max( maxCheckboxWidth, 1.1 * options.titleNode.width )
        } ),
        equationsCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'QuadraticTermsAccordionBox', QuadraticTermsAccordionBox );
export default QuadraticTermsAccordionBox;