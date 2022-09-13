// Copyright 2018-2022, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQEquationAccordionBox from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import FocusAndDirectrixEquationNode from './FocusAndDirectrixEquationNode.js';
import FocusAndDirectrixInteractiveEquationNode from './FocusAndDirectrixInteractiveEquationNode.js';

class FocusAndDirectrixEquationAccordionBox extends GQEquationAccordionBox {

  /**
   * @param {VertexFormModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'accordion box that contains the interactive equation'

    }, options );

    assert && assert( !options.titleNode, 'FocusAndDirectrixEquationAccordionBox sets titleNode' );
    options.titleNode = new FocusAndDirectrixEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
      model.pProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixEquationAccordionBox', FocusAndDirectrixEquationAccordionBox );
export default FocusAndDirectrixEquationAccordionBox;