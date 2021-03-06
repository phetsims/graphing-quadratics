// Copyright 2018-2021, University of Colorado Boulder

/**
 * Accordion box in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQEquationAccordionBox from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import VertexFormEquationNode from './VertexFormEquationNode.js';
import VertexFormInteractiveEquationNode from './VertexFormInteractiveEquationNode.js';

class VertexFormEquationAccordionBox extends GQEquationAccordionBox {

  /**
   * @param {VertexFormModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    assert && assert( !options.titleNode, 'VertexFormEquationAccordionBox sets titleNode' );
    options.titleNode = new VertexFormEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: options.tandem.createTandem( 'titleNode' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const interactiveEquationNode = new VertexFormInteractiveEquationNode(
      model.aProperty, model.hProperty, model.kProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'VertexFormEquationAccordionBox', VertexFormEquationAccordionBox );
export default VertexFormEquationAccordionBox;