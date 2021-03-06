// Copyright 2018-2021, University of Colorado Boulder

/**
 * Equation accordion box in the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQEquationAccordionBox from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormEquationNode from './StandardFormEquationNode.js';
import StandardFormInteractiveEquationNode from './StandardFormInteractiveEquationNode.js';

class StandardFormEquationAccordionBox extends GQEquationAccordionBox {

  /**
   * @param {StandardFormModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'accordion box that contains the interactive equation'

    }, options );

    assert && assert( !options.titleNode, 'StandardFormEquationAccordionBox sets titleNode' );
    options.titleNode = new StandardFormEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: options.tandem.createTandem( 'titleNode' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const interactiveEquationNode = new StandardFormInteractiveEquationNode(
      model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'StandardFormEquationAccordionBox', StandardFormEquationAccordionBox );
export default StandardFormEquationAccordionBox;